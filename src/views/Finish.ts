import WithRender from './Finish.html';
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
          AppSuccess,
          Jumbotron
        },
    },
)

export default class Finish extends Vue {
    @State('product') public product!: ProductState;
    @State('order') public order!: OrderState;
    @orderModule.Action('getOrder') public getOrder: any;
    @accountModule.Action('getAccount') public getAccount: any;
    @accountModule.Getter('account') public accountEntity!: AccountEntity;
    @orderModule.Getter('getOrder') public orderEntity!: OrderEntity;
    @productModule.Getter('getProductState') public productEntity!: ProductEntity;
    constructor() {
      super();
    }
    public success: boolean = false;
    public showJSon: boolean = false;
    public lblInitInfo: string = 'Connection......';
    public activePublicKey: string = '';
    public ownerPublicKey: string = '';
    public eosAccountName: string = '';
    public email: string = '';
    mounted() {
      window.setTimeout(() => this.getOrder(), 3000);
      this.ownerPublicKey = this.orderEntity === undefined? '': this.orderEntity.ownerPublicKey;
      this.activePublicKey = this.orderEntity === undefined? '': this.orderEntity.activePublicKey;
      this.eosAccountName = this.orderEntity.eosAccountName;
      this.email = this.orderEntity.emailAddress;
    }
    get orderId() {
      return this.getOrder.orderId;
    }
    get orderStatus() {
      return this.getOrder.orderStatus;
    }
    get orderStatusLabel() {
      return this.getOrder.orderStatusLabel;
    }
    get lblJSonInfo() {
      return this.showJSon ? "Hide JSON" : "Show JSON";
    }
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
    get accountName() {
      return this.accountEntity.accountName;
    }
    get createdw() {
      return this.accountEntity.created;
    }
    get coreLiquidBalance() {
      return this.accountEntity.coreLiquidBalance;
    }
    get ramQuota() {
      return this.accountEntity.ramQuota;
    }
    get ramUsage() {
      return this.accountEntity.ramUsage;
    }
    get cpuWeight() {
      return this.accountEntity.cpuWeight;
    }
    get cpuLimitUsed() {
      return this.accountEntity.cpuLimitUsed;
    }
    get cpuLimitMax() {
      return this.accountEntity.cpuLimitMax;
    }
    get netWeight() {
      return this.accountEntity.netWeight;
    }
    get netLimitUsed() {
      return this.accountEntity.netLimitUsed;
    }
    get netLimitMax() {
      return this.accountEntity.netLimitMax;
    }
    get jsonInfo() {
      return this.accountEntity.jsonInfo;
    }
  get  orderStatusMsg() {
      return this.orderEntity.orderStatusLabel ? this.orderEntity.orderStatusLabel : this.lblInitInfo;
  };

  jsonClick() {
    this.showJSon = !this.showJSon;
  };
  getOrderStatus() {
    this.getOrder();
  }

};
