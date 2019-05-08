import Vue from 'vue';
import Vuex from 'vuex';
import { order } from './order';
import { product } from './product';
import { account } from './account';
import { profile } from './profile';
import { RootState } from './types';
import { MultiLanguage } from '../entity/multiLanguage.entity';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    multiLanguage: new MultiLanguage(),
    version: '1.0.0', // a simple property
  },
  modules: {
    order, product, account, profile
  },
  mutations: {

  },
  actions: {

  },
});
