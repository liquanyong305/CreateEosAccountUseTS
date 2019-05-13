import { GetterTree } from 'vuex';
import { ProductState } from './types';
import { RootState } from '../types';
import { ProductEntity } from '../../entity/product.entity';

export const getters: GetterTree<ProductState, RootState> = {
    getProductState(state): ProductEntity {
        const { product } = state;
        // const accountName = (order.eosAccountName);
        return product;
    },
};
