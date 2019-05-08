import { MutationTree } from 'vuex';
import { ProductState } from './types';

export const mutations: MutationTree<ProductState> = {
    setProduct(state, product) {
        state.product.productId = product.productId;
        state.product.productName = product.productName;
        state.product.salePriceTime = product.salePriceTime;
        state.product.stripeSalePrice = product.stripeSalePrice;
        state.product.coinbaseSalePrice = product.coinbaseSalePrice;
        state.product.salePriceCurrency = product.salePriceCurrency;
    },
    productError(state, errors) {
        // console.log('customer-search.store.handleError');
        state.errors = errors;
    },
};
