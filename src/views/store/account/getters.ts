import { GetterTree } from 'vuex';
import { AccountState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<AccountState, RootState> = {
    account: (state) => state.account,
};
