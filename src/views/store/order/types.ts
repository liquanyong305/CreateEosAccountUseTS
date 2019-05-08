import { OrderEntity } from '../../entity/order.entity';

export interface OrderState {
    order: OrderEntity;
    errors: any;
}
