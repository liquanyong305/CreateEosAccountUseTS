import { ActionTree } from 'vuex';
import axios from 'axios';
import { AccountState } from './types';
import { RootState } from '../types';

export const actions: ActionTree<AccountState, RootState> = {
    /**
     * getAccount
     * @param param0
     */
    getAccount({
        state,
        commit,
        rootState,
    }) {
        axios.post('/api/ear/get-account', {
            eos_account_name: state.account.accountName,
            lang: rootState.multiLanguage.lang,
        }).then((response) => {
            const payload: Account = response.data.data;
            if (response.data.code === '200') {
                commit('setAccount', payload);
                // cb(response.data.data);
            } else {
                commit('accountError', response.data.code);
            }
        }, (error) => {
            commit('accountError', error);
        });
    },
};
