import { MutationTree } from 'vuex';
import { ProductState } from './types';

export const mutations: MutationTree<ProductState> = {
    setProduct(state, product) {
        state.product.productId = product.product_id;
        state.product.productName = product.product_name;
        state.product.salePriceTime = product.sale_price_time;
        state.product.stripeSalePrice = product.stripe_sale_price;
        state.product.coinbaseSalePrice = product.coinbase_sale_price;
        state.product.salePriceCurrency = product.sale_price_currency;
    },
    productError(state, errors) {
        // console.log('customer-search.store.handleError');
        state.errors = errors;
    },
};
