import { AccountEntity } from '../../entity/account.entity';

export interface AccountState {
    account: AccountEntity;
    errors: any;
}
