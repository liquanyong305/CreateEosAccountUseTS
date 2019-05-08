import { MutationTree } from 'vuex';
import { AccountState } from './types';
import { AccountEntity } from '@/views/entity/account.entity';

export const mutations: MutationTree<AccountState> = {
    setAccount(state, account: AccountEntity) {
        state.account = account;

        if (account.coreLiquidBalance) {
            state.account.coreLiquidBalance = account.coreLiquidBalance;
        } else {
            state.account.coreLiquidBalance = '0.0000 EOS';
        }
        state.account.jsonInfo = JSON.stringify(account, null, '\t');
    },
    accountError(state, error) {
        state.errors = error;
    },
};
