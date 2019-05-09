import WithRender from './CreateAccountName.html';
import {Component, Prop, Vue} from 'vue-property-decorator';
import {State, Action, Getter, namespace} from 'vuex-class';
import {ProductState} from './store/product/types';
import {OrderState} from './store/order/types';
import { AccountEntity } from './entity/account.entity'
import { ProductEntity } from './entity/product.entity';
import { OrderEntity } from './entity/order.entity';

import NavbarPage from "../components/NavbarPage.vue";
import NavBread from "../components/NavBread.vue";
import CheckStep from "../components/CheckStep.vue";
import MyFooter from "../components/MyFooter.vue";
import Container from "../components/common/Container.vue";
import Jumbotron from "../components/common/Jumbotron.vue";
import AppSuccess from "../components/AppSuccess.vue";
import { account } from './store/account';

const accountModule = namespace('account');
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
          MyFooter,
          AppSuccess
        },
    },
)

export default class Finish extends Vue {
    @State('product') public product!: ProductState;
    @State('order') public order!: OrderState;
    @orderModule.Action('getOrder') public getOrder: any;
    @accountModule.Action('getAccount') public getAccount: any;
    @accountModule.Getter('account') public accountEntity!: AccountEntity;
    @orderModule.Getter('order') public orderEntity!: OrderEntity;
    @productModule.Getter('product') public productEntity!: ProductEntity;
    constructor() {
      super();
    }
    public success: boolean = false;
    public showJSon: boolean = false;
  // computed: {
  //   ...mapGetters("multiLanguage", ["lang", "displayInfo"]),

  //   ...mapGetters("order", {
  //     accountName: "eosAccountName",
  //     email: "emailAddress",
  //     ownerPublicKey: "ownerPublicKey",
  //     activePublicKey: "activePublicKey",

  //     orderId: "orderId",
  //     orderStatus: "orderStatus",
  //     orderStatusLabel: "orderStatusLabel"
  //   }),

  //   ...mapGetters("account", [
  //     "accountName",
  //     "created",
  //     "coreLiquidBalance",
  //     "ramQuota",
  //     "ramUsage",
  //     "cpuWeight",
  //     "cpuLimitUsed",
  //     "cpuLimitMax",
  //     "netWeight",
  //     "netLimitUsed",
  //     "netLimitMax",
  //     "jsonInfo"
  //   ]),

  //   lblJSonInfo: function() {
  //     return this.showJSon ? "Hide JSON" : "Show JSON";
  //   },

  //   // multi-language display process of item within screen.
  //   screenItemInfo: function() {
  //     return this.displayInfo.filter(row => row.function_name === "fin");
  //   },

  //   commonScreenItemInfo: function() {
  //     return this.displayInfo.filter(row => row.function_name === "comm");
  //   },

  //   // ----------------------------------------------multi-language--start-----------------------------------------------------
  //   lblInitInfo: function() {
  //     return this.screenItemInfo.filter(
  //       row => row.item_name === "lblInitInfo"
  //     )[0].item_value;
  //   },

  //   lblFinCongratulation: function() {
  //     return this.screenItemInfo.filter(
  //       row => row.item_name === "lblFinCongratulation"
  //     )[0].item_value;
  //   },

  //   lblBtnRefresh: function() {
  //     return this.screenItemInfo.filter(
  //       row => row.item_name === "lblBtnRefresh"
  //     )[0].item_value;
  //   },

  //   lblBtnAccountInfo: function() {
  //     return this.screenItemInfo.filter(
  //       row => row.item_name === "lblBtnAccountInfo"
  //     )[0].item_value;
  //   },

  //   lblCommAccountName: function() {
  //     return this.commonScreenItemInfo.filter(
  //       row => row.item_name === "lblCommAccountName"
  //     )[0].item_value;
  //   },

  //   lblCommEmail: function() {
  //     return this.commonScreenItemInfo.filter(
  //       row => row.item_name === "lblCommEmail"
  //     )[0].item_value;
  //   },

  //   lblCommPpkOwner: function() {
  //     return this.commonScreenItemInfo.filter(
  //       row => row.item_name === "lblCommPpkOwner"
  //     )[0].item_value;
  //   },

  //   lblCommPpkActive: function() {
  //     return this.commonScreenItemInfo.filter(
  //       row => row.item_name === "lblCommPpkActive"
  //     )[0].item_value;
  //   },

  //   orderStatusMsg: function() {
  //     return this.orderStatusLabel ? this.orderStatusLabel : this.lblInitInfo;
  //   }
  //   // ----------------------------------------------multi-language--end-------------------------------------------------------
  // },
  get  orderStatusMsg() {
      return this.orderEntity.orderStatusLabel ? this.orderEntity.orderStatusLabel : this.lblInitInfo;
  };

  jsonClick() {
    this.showJSon = !this.showJSon;
  };
  // methods: {
  //   ...mapActions("order", {
  //     getOrderStatus: "getOrder"
  //   }),

  //   ...mapActions("account", ["getAccount"]),

  //   jsonClick() {
  //     this.showJSon = !this.showJSon;
  //   }
  // },

  mounted() {
    window.setTimeout(() => this.getOrder(), 3000);
  }
};
