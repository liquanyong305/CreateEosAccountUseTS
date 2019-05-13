import { GetterTree } from 'vuex';
import { OrderState } from './types';
import { RootState } from '../types';
import { OrderEntity } from '../../entity/order.entity';

export const getters: GetterTree<OrderState, RootState> = {
    getOrder(state): OrderEntity {
        console.log("state.order: ", console.log);
        const { order } = state;
        // const accountName = (order.eosAccountName);
        return order;
    },
};
