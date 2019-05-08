import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { AccountState } from './types';
import { RootState } from '../types';
import { AccountEntity } from '@/views/entity/account.entity';

export const state: AccountState = {
    account: new AccountEntity(),
    errors: undefined,
};

const namespaced: boolean = true;

export const account: Module<AccountState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
