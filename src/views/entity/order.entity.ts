export class OrderEntity {
    public eosAccountName: string;
    public emailAddress: string;
    public ownerPublicKey: string;
    public activePublicKey: string;
    public productId: string;
    public paymentType: string;
    public stripeCheckout: string;
    public stripeCheckoutType: string;
    public orderId: string;
    public stripePublicKey: string;
    public coinbaseCheckout: string;
    public stripeEmail: string;
    public orderStatus: string;
    public orderStatusLabel: string;
    public mailVerifyFlg: string;
    public accountNameExistFlg: string;
    constructor() {
        this.eosAccountName = '',
        this.emailAddress = '',
        this.ownerPublicKey = '',
        this.activePublicKey = '',
        this.productId = '',
        this.paymentType = '0',
        this.stripeCheckout = '',
        this.stripeCheckoutType = '',
        this.orderId = '',
        this.stripePublicKey = '',
        this.coinbaseCheckout = '',
        this.stripeEmail = '',
        this.orderStatus = '',
        this.orderStatusLabel = '',
        this.mailVerifyFlg = '0',
        this.accountNameExistFlg = '0';
    }
}
