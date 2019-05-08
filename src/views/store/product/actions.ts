import { ActionTree } from 'vuex';
import axios from 'axios';
import { ProductState } from './types';
import { RootState } from '../types';
import { ProductEntity } from '@/views/entity/product.entity';

export const actions: ActionTree<ProductState, RootState> = {
    getProduct({
        commit,
        rootState,
    }) {
        axios.post('/api/ear/get-product', {
                lang: rootState.multiLanguage.lang,
            }).then((response) => {
                if (response.data.code === '200') {
                    const payload: ProductEntity = response.data.data;
                    commit('setProduct', payload);
                    commit('order/setProductId', payload.productId, {root: true });
                } else {
                    commit('productError', response.data.code);
                }
            }, (error) => {
                commit('productError', error);
            });
    },
};
