import WithRender from './CreateAccountName.html';
import {Component, Prop, Vue} from 'vue-property-decorator';
import {State, Action, Getter, namespace} from 'vuex-class';
import {ProductState} from './store/product/types';
import {OrderState} from './store/order/types';
import { ProductEntity } from './entity/product.entity';
import { OrderEntity } from './entity/order.entity';
import axios from 'axios';
import NavbarPage from "../components/NavbarPage.vue";
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
// const namespace : string = 'order';

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
          MyFooter,
        },
    },
)
export default class CreateAccountName extends Vue {

    @State('product') public product!: ProductState;
    @State('order') public order!: OrderState;
    @orderModule.Action('setEosAccountName') public setEosAccountName: any;
    @orderModule.Action('setEmailAddress') public setEmailAddress: any;
    @orderModule.Action('setMailVerifyFlg') public setMailVerifyFlg: any;
    @orderModule.Action('setAccountNameExistFlg') public setAccountNameExistFlg: any;
    @productModule.Action('getProduct') public getProduct: any;
    @orderModule.Getter('getOrder') public getOrder!: OrderEntity;
    @productModule.Getter('getProductState') public productEntity!: ProductEntity;
    constructor() {
      super();
    }

    private accountNamePage = '';
    private emailPage = '';
    private mailVerifyFlag = '';
    private accountNameExistFlag = '';
    private productName = '';
    private salePriceTime = '';
    private stripeSalePrice = 0 ;
    private coinbaseSalePrice = 0;
    private verificationCode: string = '';
    private accountNameErrorMsg: string = '';
    private emailErrorMsg: string = '';
    private verificationCodeErrorMsg: string = '';
    private totalTime: number = 120;
    private canClick: boolean = true;
    private contentPattern: string = '1'; // 'Get Verification Code'
    private lblActNamePhr: string = 'Enter a valid account name';
    private lblEmailAdrPhr: string = 'Enter a valid email address';

    // mounted
    public mounted() {
      // fetching data as soon as the component's been mounted
      this.accountNamePage= this.getOrder.eosAccountName;
      this.emailPage = this.getOrder === undefined? '': this.getOrder.emailAddress;
      this.mailVerifyFlag = this.getOrder === undefined? '': this.getOrder.mailVerifyFlg;
      this.accountNameExistFlag = this.getOrder === undefined? '': this.getOrder.accountNameExistFlg;
      this.productName = this.productEntity === undefined? '': this.productEntity.productName;
      this.salePriceTime = this.productEntity === undefined? '': this.productEntity.salePriceTime;
      this.stripeSalePrice = this.productEntity === undefined? 0: this.productEntity.stripeSalePrice;
      this.coinbaseSalePrice = this.productEntity === undefined? 0: this.productEntity.coinbaseSalePrice;

      this.getProduct();
      // console.log(this.$http.get('http://jsonplaceholder.typicode.com/posts'));
    }
    // computed ///////////////////////
    get accountNameExistMsg() {
        if (
          this.accountNamePage.length > 0 &&
          !this.checkValidAccountName(this.accountNamePage)
        ) {
          this.accountNameExistFlag = '0';
          this.accountNameErrorMsg = '';
          return 'Invalid account name!';
        } else {
          return '';
        }
    }
    get isNextButtonDisabled() {
        if (
            !this.accountNameErrorMsg &&
            !this.accountNameExistMsg &&
            this.accountNameExistFlag == '1' && // the Account Name what you have inputed is not exist
            !this.emailErrorMsg &&
            this.accountNamePage &&
            this.emailPage
        ) {
          return false;
        } else {
          // return true;
          return false;
        }
    }
    get content() {
        if (this.contentPattern === '1') {
          return 'Get Verification Code';
        } else if (this.contentPattern === '2') {
          return 'ReSend Verification Code';
        } else {
          // 'ReSend after {totalTime} s'
          // this.content = 'ReSend after ' + this.totalTime + ' s';
          return 'ReSend after {totalTime} s'.replace('{totalTime}', this.totalTime.toString());
        }
    }
    opt(oldVal: any, e: any) {
      var re = new RegExp(e.target.pattern);
      var result = re.exec(e.target.value.toLowerCase());

      return (e.target.value = result ? result[0] : "");
    }
    // computed end //////////////////////////////
    // method
    checkValidAccountName(name: string) {
        return /[^1-5a-z]/.test(name) ? false : name.length == 12;
    }
    checkAccountName() {
        if (this.checkValidAccountName(this.accountNamePage)) {
            axios.post('/api/ear/check-account-exist', {
                eos_account_name: this.accountNamePage,
                lang: 'en',
            }).then((response) => {
                if (response.data.code === '300') {
                    this.accountNameExistFlag = '2';
                    this.accountNameErrorMsg = 'The account name entered has already been registered!';
                } else if (response.data.code === '200') {
                    this.accountNameExistFlag = '1';
                }
            }).catch((error) => console.log(error));
        }
    }
    // 
    checkEmail() {
        this.emailErrorMsg = '';
        if (this.emailPage.length > 0) {
          if (!this.validEmail(this.emailPage)) {
            this.emailErrorMsg = 'Invalid email address!';
          } else {
            axios.post('/api/ear/check-email-verified', {
                email_address: this.emailPage,
                lang: 'en',
            }).then((response) => {
                if (response.data.code === '300') {
                    // this.emailErrorMsg = 'email not verified! new Mail Recive Verification code';
                    this.mailVerifyFlag = '2';
                  } else {
                    this.mailVerifyFlag = '1';
                  }
            }).catch((error) => console.log(error));
          }
        }
    }
    // valid Email
    validEmail(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    // Check Mail if is Verified, if not -> send mail
    checkEmailVerify() {
        // check Email valid
        if (this.emailPage.length <= 0) {
          this.emailErrorMsg = 'Email required.';
        } else if (!this.validEmail(this.emailPage)) {
          this.emailErrorMsg = 'Invalid email address!';
        } else {
            axios.post('/api/ear/check-email-verified', {
                email_address: this.emailPage,
                lang: 'en',
            }).then((response) => {
                if (response.status !== 200) {
                    axios.post('/api/ear/send-confirm-code', {
                        email_address: this.emailPage,
                        lang: 'en',
                    }).then((response) => {
                        if (response.status === 200) {
                            this.countDown();
                          }
                    }).catch((error) => console.log(error));
                }
            }).catch((error) => console.log(error));
        }
    }
    public countDown() {
        if (!this.canClick) return;
        this.totalTime = 120;
        this.canClick = false;
        this.contentPattern = '3';
        let clock = window.setInterval(() => {
          this.totalTime--;
          if (this.totalTime < 0) {
            window.clearInterval(clock);
            this.totalTime = 120;
            this.canClick = true;
            this.contentPattern = '2';
            this.checkEmail();
          }
      }, 1000);
    }

    // Next to CreatePublicKey
    public trunToCreatePublickey() {
      this.saveInfo();
        // if (this.mailVerifyFlag === '2') {
        //   if (this.verificationCode.length <= 0) {
        //     this.verificationCodeErrorMsg = 'Please enter the verification code received via the email address specified above.';
        //   } else {
        //     axios.post('/api/ear/verify-email-address', {
        //         email_address: this.emailPage,
        //         confirm_code: this.verificationCode,
        //         lang: 'en',
        //     }).then((response) => {
        //         if (response.data.code !== '200') {
        //             this.verificationCodeErrorMsg = response.data.msg;
        //         } else {
        //             this.mailVerifyFlag = '1';
        //             this.saveInfo();
        //         }
        //     }).catch((error) => console.log(error));
        //   }
        // } else if (this.mailVerifyFlag === '1') {
        //   this.saveInfo();
        // }
    }
    public saveInfo() {
        this.setEosAccountName(this.accountNamePage);
        this.setEmailAddress(this.emailPage);
        this.setMailVerifyFlg(this.mailVerifyFlag);
        this.setAccountNameExistFlg(this.accountNameExistFlag);
        this.$router.push({
            name: 'cpk',
        });
    }
}
