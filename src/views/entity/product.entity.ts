export class ProductEntity {
    public productId: string;
    public productName: string;
    public salePriceTime: string;
    public stripeSalePrice: number;
    public coinbaseSalePrice: number;
    public salePriceCurrency: string;
    constructor() {
        this.productId = '';
        this.productName = '';
        this.salePriceTime = '';
        this.stripeSalePrice = 0;
        this.coinbaseSalePrice = 0;
        this.salePriceCurrency = '';
    }
}
