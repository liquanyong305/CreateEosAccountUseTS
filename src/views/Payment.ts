import WithRender from './Payment.html';
import {Component, Prop, Vue} from 'vue-property-decorator';
import {State, Action, Getter, namespace} from 'vuex-class';
import {ProductState} from './store/product/types';
import {OrderState} from './store/order/types';
import { ProductEntity } from './entity/product.entity';
import { OrderEntity } from './entity/order.entity';

import NavbarPage from '../components/NavbarPage.vue';
import NavBread from '../components/NavBread.vue';
import CheckStep from '../components/CheckStep.vue';
import MyFooter from '../components/MyFooter.vue';
import Row from '../components/common/Row.vue';
import Column from '../components/common/Col.vue';
import Container from '../components/common/Container.vue';
import Card from '../components/common/Card.vue';
import CardBody from '../components/common/CardBody.vue';

const productModule = namespace('product');
const orderModule = namespace('order');
// import dataApi from '../api/adapter';
@WithRender
@Component(
    {
        components: {
          NavbarPage,
          NavBread,
          CheckStep,
          Container,
          Row,
          Column,
          Card,
          CardBody,
          MyFooter
        },
    },
)

export default class Payment extends Vue {
    @State('product') public product!: ProductState;
    @State('order') public order!: OrderState;
    @orderModule.Action('setPaymentType') public setPaymentType: any;
    @orderModule.Action('makeOrder') public makeOrder: any;
    @orderModule.Action('setStripeCheckout') public setStripeCheckout: any;
    @orderModule.Action('setStripeCheckoutType') public setStripeCheckoutType: any;
    @orderModule.Action('setStripeEmail') public setStripeEmail: any;
    @orderModule.Action('paymentStripe') public paymentStripe: any;
    @productModule.Action('getProduct') public getProduct: any;
    @orderModule.Getter('getOrder') public getOrder!: OrderEntity;
    @productModule.Getter('getProductState') public getProductState!: ProductEntity;
    constructor() {
      super();
    }
    public selected: string = '';
    public count: number = 0;
    public status: boolean = false;
    public errorMessage: string= '';
    public lblInfoStripeBtn: string='lblInfoStripeBtn';
    public lblInfoStripeTitle: string='Order No:';
    public activePublicKey: string = '';
    public ownerPublicKey: string = '';
    public accountName: string = '';
    public email: string = '';
    public orderId: string = '';
    public stripePublicKey: string = '';
    public coinbaseCheckout: string = '';
    mounted() {
        this.ownerPublicKey = this.getOrder === undefined? '': this.getOrder.ownerPublicKey;
        this.activePublicKey = this.getOrder === undefined? '': this.getOrder.activePublicKey;
        this.accountName = this.getOrder.eosAccountName;
        this.email = this.getOrder.emailAddress;
        this.orderId = this.getOrder.orderId;
        this.stripePublicKey = this.getOrder.stripePublicKey;
        this.coinbaseCheckout = this.getOrder.coinbaseCheckout;
    }

    created() {
        //this.getProduct();
        if (typeof (<any>window).StripeCheckout === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://checkout.stripe.com/checkout.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        
    };
    get creditCurrency() {
        return this.getProductState.stripeSalePrice;
    }
    get productId() {
        return this.getProductState.productId;
    }
    get productName() {
        return this.getProductState.productName;
    }
    get cryptoCurrency() {
        return this.getProductState.coinbaseSalePrice;
    }
    get priceCurrency() {
        return this.getProductState.salePriceCurrency;
    }

    // computed: {
        // ...mapGetters('multiLanguage', ['lang', 'displayInfo']),

        // ...mapGetters('product', {
        //     productId: 'productId',
        //     productName: 'productName',
        //     creditCurrency: 'stripeSalePrice',
        //     cryptoCurrency: 'coinbaseSalePrice',
        //     priceCurrceny: 'salePriceCurrency'
        // }),

        // ...mapGetters('order', {
        //     accountName: 'eosAccountName',
        //     email: 'emailAddress',
        //     ownerPublicKey: 'ownerPublicKey',
        //     activePublicKey: 'activePublicKey',

        //     orderId: 'orderId',
        //     stripePublicKey: 'stripePublicKey',
        //     coinbaseCheckout: 'coinbaseCheckout'
        // }),

        // multi-language display process of item within screen.
        // screenItemInfo: function() {
        //     return this.displayInfo.filter(row => row.function_name === 'pay');
        // },

        // commonScreenItemInfo: function() {
        //     return this.displayInfo.filter(row => row.function_name === 'comm');
        // },

        // // ----------------------------------------------multi-language--start-----------------------------------------------------
        // lblPayPoint: function() {
        //     return this.screenItemInfo.filter(
        //         row => row.item_name === 'lblPayPoint'
        //     )[0].item_value;
        // },

        // lblPayDescription: function() {
        //     return this.screenItemInfo.filter(
        //         row => row.item_name === 'lblPayDescription'
        //     )[0].item_value;
        // },

        // lblPayOption: function() {
        //     return this.screenItemInfo.filter(
        //         row => row.item_name === 'lblPayOption'
        //     )[0].item_value;
        // },

        // lblPayOptionItem1: function() {
        //     return this.screenItemInfo.filter(
        //         row => row.item_name === 'lblPayOptionItem1'
        //     )[0].item_value;
        // },

        // lblPayOptionItem2: function() {
        //     return this.screenItemInfo.filter(
        //         row => row.item_name === 'lblPayOptionItem2'
        //     )[0].item_value;
        // },

        // lblPayOptionItem3: function() {
        //     return this.screenItemInfo.filter(
        //         row => row.item_name === 'lblPayOptionItem3'
        //     )[0].item_value;
        // },

        // lblInfoTotal: function() {
        //     return this.screenItemInfo.filter(
        //         row => row.item_name === 'lblInfoTotal'
        //     )[0].item_value;
        // },

        // lblInfoStripeBtn: function() {
        //     return this.screenItemInfo.filter(
        //         row => row.item_name === 'lblInfoStripeBtn'
        //     )[0].item_value;
        // },

        // lblInfoStripeTitle: function() {
        //     return this.screenItemInfo.filter(
        //         row => row.item_name === 'lblInfoStripeTitle'
        //     )[0].item_value;
        // },

        // lblCommAccountName: function() {
        //     return this.commonScreenItemInfo.filter(
        //         row => row.item_name === 'lblCommAccountName'
        //     )[0].item_value;
        // },

        // lblCommEmail: function() {
        //     return this.commonScreenItemInfo.filter(
        //         row => row.item_name === 'lblCommEmail'
        //     )[0].item_value;
        // },

        // lblCommPpkOwner: function() {
        //     return this.commonScreenItemInfo.filter(
        //         row => row.item_name === 'lblCommPpkOwner'
        //     )[0].item_value;
        // },

        // lblCommPpkActive: function() {
        //     return this.commonScreenItemInfo.filter(
        //         row => row.item_name === 'lblCommPpkActive'
        //     )[0].item_value;
        // },

        // lblBtnPrevious: function() {
        //     return this.commonScreenItemInfo.filter(
        //         row => row.item_name === 'lblBtnPrevious'
        //     )[0].item_value;
        // },

        // lblBtnPayWithStripe: function() {
        //     return this.commonScreenItemInfo.filter(
        //         row => row.item_name === 'lblBtnPayWithStripe'
        //     )[0].item_value;
        // },

        // lblBtnPayWithCoinbase: function() {
        //     return this.commonScreenItemInfo.filter(
        //         row => row.item_name === 'lblBtnPayWithCoinbase'
        //     )[0].item_value;
        // }
        // ----------------------------------------------multi-language--end-------------------------------------------------------
    // };
    payTypeChange() {
        if (this.selected == '1') {
            this.count = this.getProductState.stripeSalePrice;
        } else {
            this.count = this.getProductState.coinbaseSalePrice;
        }
    }

    pay() {
        if (this.selected === '1') {
            this.setPaymentType('stripe');
            // 非同期通信 ////////////////////////// ここの実装不正、MUTATIONにより設定した状態により、OKかどうか判断すると想定している。
            this.makeOrder().then((returnValue: any) => {
                //if (returnValue.code === 'OK') {
                    let $checkout = (<any>window).StripeCheckout.configure({
                        key: this.getOrder.stripePublicKey,
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
                            name: this.getProductState.productName,
                            description:
                                this.lblInfoStripeTitle + this.getOrder.orderId,
                            amount: this.getProductState.stripeSalePrice * 100,
                            currency: this.getProductState.salePriceCurrency,
                            email: '',

                            token: (token: any) => {
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
                // } else {
                //     this.errorMessage = returnValue.msg;
                // }
            });
        } else {
            // this.selected === '2'
            this.setPaymentType('coinbase');

            this.makeOrder().then((returnValue: any) => {
                if (returnValue.code === 'OK') {
                    window.open(
                        'https://commerce.coinbase.com/checkout/' +
                            this.getOrder.coinbaseCheckout,
                        '_blank'
                    );

                    this.paymentSuccess();
                } else {
                    this.errorMessage = returnValue.msg;
                }
            });
        }
    }

    done(token: any) {
        this.setStripeCheckout(token.id);
        this.setStripeCheckoutType(token.type);
        this.setStripeEmail(token.email);

        this.paymentStripe();
        this.paymentSuccess();
    }

    opened() {
        this.status = true;
    }

    closed() {
        this.status = false;
    }

    paymentSuccess() {
        this.$router.push({
            name: 'fin'
        });
    }

};
