export class ProductEntity {
    public productId: string;
    public productName: string;
    public salePriceTime: string;
    public stripeSalePrice: string;
    public coinbaseSalePrice: string;
    public salePriceCurrency: string;
    constructor() {
        this.productId = '';
        this.productName = '';
        this.salePriceTime = '';
        this.stripeSalePrice = '';
        this.coinbaseSalePrice = '';
        this.salePriceCurrency = '';
    }
}
