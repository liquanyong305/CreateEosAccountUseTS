import { GetterTree } from 'vuex';
import { OrderState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<OrderState, RootState> = {
    order: (state) => state.order,
};
