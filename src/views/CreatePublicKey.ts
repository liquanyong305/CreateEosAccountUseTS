import WithRender from './CreatePublicKey.html';
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
import dataApi from '../utils/adapter';
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

export default class CreatePublicKey extends Vue {

    @State('product') public product!: ProductState;
    @State('order') public order!: OrderState;
    @orderModule.Action('setOwnerPublicKey') public setOwnerPublicKey: any;
    @orderModule.Action('setActivePublicKey') public setActivePublicKey: any;

    @orderModule.Getter('getOrder') public getOrder!: OrderEntity;
    @productModule.Getter('getProductState') public productEntity!: ProductEntity;
    constructor() {
      super();
    }
    public ownerPublicKeyPage: string = '';
    public activePublicKeyPage: string = '';
    public sendKeyToEmaiMessage: string = '';
    public ownerPublicKeyErrorMsg: string = '';
    public activePublicKeyErrorMsg: string = '';
    public accountName: string = '';
    public email: string = '';
    public mounted() {
        this.ownerPublicKeyPage = this.getOrder === undefined? '': this.getOrder.ownerPublicKey;
        this.activePublicKeyPage = this.getOrder === undefined? '': this.getOrder.activePublicKey;
        this.accountName = this.getOrder.eosAccountName;
        this.email = this.getOrder.emailAddress;
        this.productEntity;
    }

    // computed: {
    //     // multi-language display process of item within screen.
    //     screenItemInfo: function() {
    //         return this.displayInfo.filter(row => row.function_name === 'cpk');
    //     },

    //     commonScreenItemInfo: function() {
    //         return this.displayInfo.filter(row => row.function_name === 'comm');
    //     },

    //     // ----------------------------------------------multi-language--start-----------------------------------------------------
    //     lblPpk: function() {
    //         return this.screenItemInfo.filter(
    //             row => row.item_name === 'lblPpk'
    //         )[0].item_value;
    //     },

    //     lblCpkPoint: function() {
    //         return this.screenItemInfo.filter(
    //             row => row.item_name === 'lblCpkPoint'
    //         )[0].item_value;
    //     },

    //     lblCpkActive: function() {
    //         return this.screenItemInfo.filter(
    //             row => row.item_name === 'lblCpkActive'
    //         )[0].item_value;
    //     },

    //     lblCpkOwner: function() {
    //         return this.screenItemInfo.filter(
    //             row => row.item_name === 'lblCpkOwner'
    //         )[0].item_value;
    //     },

    //     lblCpkDescription: function() {
    //         return this.screenItemInfo.filter(
    //             row => row.item_name === 'lblCpkDescription'
    //         )[0].item_value;
    //     },

    //     lblCpkMailSend: function() {
    //         return this.screenItemInfo.filter(
    //             row => row.item_name === 'lblCpkMailSend'
    //         )[0].item_value;
    //     },

    //     lblCpkJsGenerator: function() {
    //         return this.screenItemInfo.filter(
    //             row => row.item_name === 'lblCpkJsGenerator'
    //         )[0].item_value;
    //     },

    //     lblCpkJsGeneratorMemo: function() {
    //         return this.screenItemInfo.filter(
    //             row => row.item_name === 'lblCpkJsGeneratorMemo'
    //         )[0].item_value;
    //     },

    //     lblCommAccountName: function() {
    //         return this.commonScreenItemInfo.filter(
    //             row => row.item_name === 'lblCommAccountName'
    //         )[0].item_value;
    //     },

    //     lblCommEmail: function() {
    //         return this.commonScreenItemInfo.filter(
    //             row => row.item_name === 'lblCommEmail'
    //         )[0].item_value;
    //     },

    //     lblBtnNext: function() {
    //         return this.commonScreenItemInfo.filter(
    //             row => row.item_name === 'lblBtnNext'
    //         )[0].item_value;
    //     },

    //     lblBtnPrevious: function() {
    //         return this.commonScreenItemInfo.filter(
    //             row => row.item_name === 'lblBtnPrevious'
    //         )[0].item_value;
    //     },
    //     // ----------------------------------------------multi-language--end-------------------------------------------------------

    //     isNextButtonDisabled: function() {
    //         if (
    //             !this.ownerPublicKeyErrorMsg &&
    //             !this.activePublicKeyErrorMsg &&
    //             this.ownerPublicKeyPage &&
    //             this.activePublicKeyPage
    //         ) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     }
    // },

    // computed ///////////////////////
    get isNextButtonDisabled() {
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
    };
    // method ///////////////////////
    sendKeyToEmail() {
        dataApi.sendKeys({
                email_address: this.getOrder,
                lang: 'en',
            },
            (responseCode: any) => {
                if (responseCode != '200') {
                    this.sendKeyToEmaiMessage =
                        'Send keyPairs Sucessful, Please check your Email!';
                }
            }
        );
    }

    checkOwnerPublicKey() {
        this.ownerPublicKeyErrorMsg = '';
        if (this.ownerPublicKeyPage.length < 53) {
            this.ownerPublicKeyErrorMsg =
                '53 characters ownerPublicKey required!';
        }
    }

    checkActivePublicKey() {
        this.activePublicKeyErrorMsg = '';
        if (this.activePublicKeyPage.length < 53) {
            this.activePublicKeyErrorMsg =
                '53 characters activePublicKey required!';
        }
    }

    trunToPayment() {
        dataApi.checkPublicKeys(
            {
                owner_public_key: this.ownerPublicKeyPage,
                active_public_key: this.activePublicKeyPage,
                lang: 'en',
            },
            (response: any) => {
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
    }

    saveInfo() {
        this.setOwnerPublicKey(this.ownerPublicKeyPage);
        this.setActivePublicKey(this.activePublicKeyPage);

        this.$router.push({
            name: 'pay'
        });
    }

};