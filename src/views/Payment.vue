<template>
  <div>
    <my-header></my-header>
    <check-step v-bind:step="3"></check-step>
    <main>
      <container>
        <br>
        <row>
          <column md="6">
            <cards>
              <card-body>
                <h2>{{lblPayPoint}}</h2>
                <hr>{{lblPayDescription}}
                <br>
                <br>{{lblPayOption}}
                <br>
                <select v-model="selected" @change="payTypeChange">
                  <option disabled value>{{lblPayOptionItem1}}</option>
                  <option value="1">{{lblPayOptionItem2}} {{this.creditCurrency | currency}}</option>
                  <option
                    value="2"
                  >{{lblPayOptionItem3}} {{this.cryptoCurrency | currency}}</option>
                </select>
                <br>
                <br>
                <div align="center" v-if="this.count">
                  <h2>
                    <font color="#d1434a">
                      <b>{{lblInfoTotal}} {{count | currency}}</b>
                    </font>
                  </h2>
                </div>
                <div v-if="this.selected=='1' && this.count" align="center">
                  <button
                    v-on:click="pay"
                    class="pay-with-stripe"
                    :disabled="this.status"
                  >{{lblBtnPayWithStripe}}</button>
                </div>
                <div v-if="this.selected=='2' && this.count" align="center">
                  <button
                    v-on:click="pay"
                    class="pay-with-crypto"
                    :disabled="this.status"
                  >{{lblBtnPayWithCoinbase}}</button>
                </div>
                <div id="card-errors" role="alert" v-text="errorMessage"></div>
                <div class="text-right py-4 mt-3">
                  <router-link
                    class="btn btn-smart1 btn-rounded float-left"
                    style="width:140px"
                    to="/ear/cpk"
                  >{{lblBtnPrevious}}</router-link>
                </div>
              </card-body>
            </cards>
          </column>
          <column md="6">
            <ul>
              <li>
                <h5>{{lblCommAccountName}}
                  <font color="5385c1">{{accountName}}</font>
                </h5>
              </li>
              <li>
                <h5>{{lblCommEmail}}
                  <font color="5385c1">{{email}}</font>
                </h5>
              </li>
              <li>
                <h5>{{lblCommPpkOwner}}</h5>
              </li>
              <input v-bind:value="ownerPublicKey" class="form-control" disabled="true">
              <li>
                <h5>{{lblCommPpkActive}}</h5>
              </li>
              <input v-bind:value="activePublicKey" class="form-control" disabled="true">
            </ul>
          </column>
        </row>
      </container>
    </main>
    <br>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import MyHeader from './../components/NavbarPage';
import NavBread from './../components/NavBread';
import CheckStep from './../components/CheckStep';
import MyFooter from './../components/MyFooter';
import Row from './../components/common/Row';
import Column from './../components/common/Col';
import Container from './../components/common/Container';
import Cards from './../components/common/Card';
import CardBody from './../components/common/CardBody';

export default {
    created() {
        this.$store.dispatch('product/getProduct');

        if (typeof StripeCheckout === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://checkout.stripe.com/checkout.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    },

    data() {
        return {
            selected: '',
            count: '',
            status: false,
            errorMessage: ''
        };
    },

    computed: {
        ...mapGetters('multiLanguage', ['lang', 'displayInfo']),

        ...mapGetters('product', {
            productId: 'productId',
            productName: 'productName',
            creditCurrency: 'stripeSalePrice',
            cryptoCurrency: 'coinbaseSalePrice',
            priceCurrceny: 'salePriceCurrency'
        }),

        ...mapGetters('order', {
            accountName: 'eosAccountName',
            email: 'emailAddress',
            ownerPublicKey: 'ownerPublicKey',
            activePublicKey: 'activePublicKey',

            orderId: 'orderId',
            stripePublicKey: 'stripePublicKey',
            coinbaseCheckout: 'coinbaseCheckout'
        }),

        // multi-language display process of item within screen.
        screenItemInfo: function() {
            return this.displayInfo.filter(row => row.function_name === 'pay');
        },

        commonScreenItemInfo: function() {
            return this.displayInfo.filter(row => row.function_name === 'comm');
        },

        // ----------------------------------------------multi-language--start-----------------------------------------------------
        lblPayPoint: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblPayPoint'
            )[0].item_value;
        },

        lblPayDescription: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblPayDescription'
            )[0].item_value;
        },

        lblPayOption: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblPayOption'
            )[0].item_value;
        },

        lblPayOptionItem1: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblPayOptionItem1'
            )[0].item_value;
        },

        lblPayOptionItem2: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblPayOptionItem2'
            )[0].item_value;
        },

        lblPayOptionItem3: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblPayOptionItem3'
            )[0].item_value;
        },

        lblInfoTotal: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblInfoTotal'
            )[0].item_value;
        },

        lblInfoStripeBtn: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblInfoStripeBtn'
            )[0].item_value;
        },

        lblInfoStripeTitle: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblInfoStripeTitle'
            )[0].item_value;
        },

        lblCommAccountName: function() {
            return this.commonScreenItemInfo.filter(
                row => row.item_name === 'lblCommAccountName'
            )[0].item_value;
        },

        lblCommEmail: function() {
            return this.commonScreenItemInfo.filter(
                row => row.item_name === 'lblCommEmail'
            )[0].item_value;
        },

        lblCommPpkOwner: function() {
            return this.commonScreenItemInfo.filter(
                row => row.item_name === 'lblCommPpkOwner'
            )[0].item_value;
        },

        lblCommPpkActive: function() {
            return this.commonScreenItemInfo.filter(
                row => row.item_name === 'lblCommPpkActive'
            )[0].item_value;
        },

        lblBtnPrevious: function() {
            return this.commonScreenItemInfo.filter(
                row => row.item_name === 'lblBtnPrevious'
            )[0].item_value;
        },

        lblBtnPayWithStripe: function() {
            return this.commonScreenItemInfo.filter(
                row => row.item_name === 'lblBtnPayWithStripe'
            )[0].item_value;
        },

        lblBtnPayWithCoinbase: function() {
            return this.commonScreenItemInfo.filter(
                row => row.item_name === 'lblBtnPayWithCoinbase'
            )[0].item_value;
        }
        // ----------------------------------------------multi-language--end-------------------------------------------------------
    },

    methods: {
        ...mapActions('order', [
            'setPaymentType',
            'makeOrder',
            'setStripeCheckout',
            'setStripeCheckoutType',
            'setStripeEmail',
            'paymentStripe'
        ]),

        payTypeChange() {
            if (this.selected == '1') {
                this.count = this.creditCurrency;
            } else {
                this.count = this.cryptoCurrency;
            }
        },

        pay() {
            if (this.selected === '1') {
                this.setPaymentType('stripe');

                this.makeOrder().then(returnValue => {
                    if (returnValue.code === 'OK') {
                        let $checkout = StripeCheckout.configure({
                            key: this.stripePublicKey,
                            image: 'https://dapps.smartone.io/marketplace.png',
                            locale: 'auto',
                            zipCode: false,
                            // shippingAddress: false,
                            // billingAddress: false,
                            // label: 'Pay with Card',
                            panelLabel: this.lblInfoStripeBtn + ' {{amount}}',
                            allowRememberMe: true
                        });

                        setTimeout(() => {
                            // $checkout.close() is also available.
                            $checkout.open({
                                name: this.productName,
                                description:
                                    this.lblInfoStripeTitle + this.orderId,
                                amount: this.creditCurrency * 100,
                                currency: this.priceCurrceny,
                                email: '',

                                token: token => {
                                    this.done(token);
                                },
                                opened: () => {
                                    this.opened();
                                },
                                closed: () => {
                                    this.closed();
                                }
                            });
                        }, 100);
                    } else {
                        this.errorMessage = returnValue.msg;
                    }
                });
            } else {
                // this.selected === '2'
                this.setPaymentType('coinbase');

                this.makeOrder().then(returnValue => {
                    if (returnValue.code === 'OK') {
                        window.open(
                            'https://commerce.coinbase.com/checkout/' +
                                this.coinbaseCheckout,
                            '_blank'
                        );

                        this.paymentSuccess();
                    } else {
                        this.errorMessage = returnValue.msg;
                    }
                });
            }
        },

        done(token) {
            this.setStripeCheckout(token.id);
            this.setStripeCheckoutType(token.type);
            this.setStripeEmail(token.email);

            this.paymentStripe();
            this.paymentSuccess();
        },

        opened() {
            this.status = true;
        },

        closed() {
            this.status = false;
        },

        paymentSuccess() {
            this.$router.push({
                name: 'fin'
            });
        }
    },

    components: {
        MyHeader,
        NavBread,
        CheckStep,
        Container,
        Row,
        Column,
        Cards,
        CardBody,
        MyFooter
    }
};
</script>

<style scoped>
button {
    padding: 10px 30px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 1000px;
    cursor: pointer;
    background: white;
    color: #3e64ea;
    border: 1px solid #3e64ea;
    font-family: 'Barlow', sans-serif;
    text-transform: uppercase;
    margin: 10px;
    transition: 0.15s all ease-out;
}
button:hover {
    background: #3e64ea;
    color: white;
    transition: 0.2s all ease-in;
}
button[disabled] {
    color: #ccc;
    border-color: #ccc;
    &:hover {
        background: white;
        color: #ccc;
    }
}
select {
    max-width: 100%;
}
</style>
<style scoped lang="css">
@import "./../assets/css/smart1.css";
</style>
