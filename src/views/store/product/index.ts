import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ProductState } from './types';
import { RootState } from '../types';
import { ProductEntity } from '../../entity/product.entity';

export const state: ProductState = {
    product: new ProductEntity(),
    errors: undefined,
};

const namespaced: boolean = true;

export const product: Module<ProductState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
