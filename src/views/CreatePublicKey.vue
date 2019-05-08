<template>
  <div>
    <my-header></my-header>
    <check-step v-bind:step="2"></check-step>
    <main>
      <container>
        <br>
        <row>
          <column md="6">
            <card>
              <card-body>
                <h2>{{lblPpk}}</h2>
                <hr>{{lblCpkPoint}}
                <br>
                <br>{{lblCpkOwner}}
                <input
                  v-model="ownerPublicKeyPage"
                  class="form-control"
                  v-bind:class="{checkInValid:this.ownerPublicKeyErrorMsg}"
                  v-on:change="checkOwnerPublicKey"
                >
                <p class="errorMsg" v-if="ownerPublicKeyErrorMsg">{{ownerPublicKeyErrorMsg}}</p>
                <br>{{lblCpkActive}}
                <input
                  v-model="activePublicKeyPage"
                  class="form-control"
                  v-bind:class="{checkInValid:this.activePublicKeyErrorMsg}"
                  v-on:change="checkActivePublicKey"
                >
                <p class="errorMsg" v-if="activePublicKeyErrorMsg">{{activePublicKeyErrorMsg}}</p>
                <br>
                <div class="text-right py-4 mt-3">
                  <router-link
                    class="btn btn-smart1 btn-rounded float-left"
                    style="width:140px"
                    to="/ear/can"
                  >{{lblBtnPrevious}}</router-link>
                  <router-link
                    class="btn btn-smart1 btn-rounded float-right"
                    v-bind:class="{disabled:this.isNextButtonDisabled}"
                    style="width:140px"
                    @click.native="trunToPayment"
                    to
                  >{{lblBtnNext}}</router-link>
                </div>
              </card-body>
            </card>
          </column>
          <column md="6">
            <ul>
              <li>
                <h5>
                  {{lblCommAccountName}}
                  <font color="5385c1">{{accountName}}</font>
                </h5>
              </li>
              <li>
                <h5>
                  {{lblCommEmail}}
                  <font color="5385c1">{{email}}</font>
                </h5>
              </li>
            </ul>
            <hr>
            <p>{{lblCpkDescription}}</p>
            <ul>
              <li>
                <a class="btn btn-unique btn-rounded" @click="sendKeyToEmail">Send KeyPairs to Mail</a>
                ({{lblCpkMailSend}})
                <br>
                <p class="sucessMsg" v-if="sendKeyToEmaiMessage">{{sendKeyToEmaiMessage}}</p>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://ipfs.io/ipfs/QmW4XxaEg8cWsYisfjnjqLFi1MbHMYjt7nbCh8ZHwgg9c2"
                >{{lblCpkJsGenerator}}</a>
                ({{lblCpkJsGeneratorMemo}})
              </li>
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
import Card from './../components/common/Card';
import CardBody from './../components/common/CardBody';

import dataApi from '../api/adapter';

export default {
    data() {
        return {
            ownerPublicKeyPage: this.$store.state.order.ownerPublicKey,
            activePublicKeyPage: this.$store.state.order.activePublicKey,
            sendKeyToEmaiMessage: '',
            ownerPublicKeyErrorMsg: '',
            activePublicKeyErrorMsg: ''
        };
    },

    computed: {
        ...mapGetters('multiLanguage', ['lang', 'displayInfo']),

        ...mapGetters('order', {
            accountName: 'eosAccountName',
            email: 'emailAddress',
            ownerPublicKey: 'ownerPublicKey',
            activePublicKey: 'activePublicKey'
        }),

        // multi-language display process of item within screen.
        screenItemInfo: function() {
            return this.displayInfo.filter(row => row.function_name === 'cpk');
        },

        commonScreenItemInfo: function() {
            return this.displayInfo.filter(row => row.function_name === 'comm');
        },

        // ----------------------------------------------multi-language--start-----------------------------------------------------
        lblPpk: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblPpk'
            )[0].item_value;
        },

        lblCpkPoint: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblCpkPoint'
            )[0].item_value;
        },

        lblCpkActive: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblCpkActive'
            )[0].item_value;
        },

        lblCpkOwner: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblCpkOwner'
            )[0].item_value;
        },

        lblCpkDescription: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblCpkDescription'
            )[0].item_value;
        },

        lblCpkMailSend: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblCpkMailSend'
            )[0].item_value;
        },

        lblCpkJsGenerator: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblCpkJsGenerator'
            )[0].item_value;
        },

        lblCpkJsGeneratorMemo: function() {
            return this.screenItemInfo.filter(
                row => row.item_name === 'lblCpkJsGeneratorMemo'
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

        lblBtnNext: function() {
            return this.commonScreenItemInfo.filter(
                row => row.item_name === 'lblBtnNext'
            )[0].item_value;
        },

        lblBtnPrevious: function() {
            return this.commonScreenItemInfo.filter(
                row => row.item_name === 'lblBtnPrevious'
            )[0].item_value;
        },
        // ----------------------------------------------multi-language--end-------------------------------------------------------

        isNextButtonDisabled: function() {
            if (
                !this.ownerPublicKeyErrorMsg &&
                !this.activePublicKeyErrorMsg &&
                this.ownerPublicKeyPage &&
                this.activePublicKeyPage
            ) {
                return false;
            } else {
                return true;
            }
        }
    },

    methods: {
        ...mapActions('order', ['setOwnerPublicKey', 'setActivePublicKey']),

        sendKeyToEmail() {
            dataApi.sendKeys(
                {
                    email_address: this.email,
                    lang: this.lang
                },
                responseCode => {
                    if (responseCode != '200') {
                        this.sendKeyToEmaiMessage =
                            'Send keyPairs Sucessful, Please check your Email!';
                    }
                }
            );
        },

        checkOwnerPublicKey() {
            this.ownerPublicKeyErrorMsg = '';
            if (this.ownerPublicKeyPage.length < 53) {
                this.ownerPublicKeyErrorMsg =
                    '53 characters ownerPublicKey required!';
            }
        },

        checkActivePublicKey() {
            this.activePublicKeyErrorMsg = '';
            if (this.activePublicKeyPage.length < 53) {
                this.activePublicKeyErrorMsg =
                    '53 characters activePublicKey required!';
            }
        },

        trunToPayment() {
            dataApi.checkPublicKeys(
                {
                    owner_public_key: this.ownerPublicKeyPage,
                    active_public_key: this.activePublicKeyPage,
                    lang: this.lang
                },
                response => {
                    var res = response.data;

                    if (res.code == '200') {
                        if (res.data.owner_public_key_check) {
                            if (res.data.active_public_key_check) {
                                this.saveInfo();
                            } else {
                                this.activePublicKeyErrorMsg =
                                    'valid activePublicKey required!';
                            }
                        } else {
                            this.ownerPublicKeyErrorMsg =
                                'valid ownerPublicKey required!';
                        }
                    }
                }
            );
        },

        saveInfo() {
            this.setOwnerPublicKey(this.ownerPublicKeyPage);
            this.setActivePublicKey(this.activePublicKeyPage);

            this.$router.push({
                name: 'pay'
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
        Card,
        CardBody,
        MyFooter
    }
};
</script>

<style scoped>
.errorMsg {
    color: red;
}
.sucessMsg {
    color: #00c851;
}
router-link.disabled {
    pointer-events: none;
}
.checkValid {
    border-color: #00c851 !important;
}
.checkValid:focus {
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.18), 0 4px 5px 0 rgba(0, 0, 0, 0.15);
}
.checkInValid {
    border-color: #f44336 !important;
}
.checkInValid:focus {
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.18), 0 4px 5px 0 rgba(0, 0, 0, 0.15);
}
</style>
<style scoped lang="css">
@import "./../assets/css/smart1.css";
</style>
