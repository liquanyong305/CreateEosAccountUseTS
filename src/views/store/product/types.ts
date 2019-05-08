import { ProductEntity } from '../../entity/product.entity';

export interface ProductState {
    product: ProductEntity;
    errors: any;
}
