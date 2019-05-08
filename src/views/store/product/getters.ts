import { GetterTree } from 'vuex';
import { ProductState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<ProductState, RootState> = {
    order: (state) => state.product,
};
