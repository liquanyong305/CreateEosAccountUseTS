import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { OrderState } from './types';
import { RootState } from '../types';
import { OrderEntity } from '@/views/entity/order.entity';

export const state: OrderState = {
    order: new OrderEntity(),
    errors: undefined,
};

const namespaced: boolean = true;

export const order: Module<OrderState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
