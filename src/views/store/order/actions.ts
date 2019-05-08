import { ActionTree } from 'vuex';
import axios from 'axios';
import { OrderState } from './types';
import { RootState } from '../types';
import { OrderEntity } from '@/views/entity/order.entity';

export const actions: ActionTree<OrderState, RootState> = {
    setEosAccountName({ commit }, eosAccountName) {
        commit('setEosAccountName', eosAccountName);
        commit('account/setAccountName', eosAccountName, {
            root: true,
        });
    },

    setEmailAddress({ commit }, emailAddress) {
        commit('setEmailAddress', emailAddress);
    },

    setOwnerPublicKey({ commit }, ownerPublicKey) {
        commit('setOwnerPublicKey', ownerPublicKey);
    },

    setActivePublicKey({ commit }, activePublicKey) {
        commit('setActivePublicKey', activePublicKey);
    },

    setProductId({ commit }, productId) {
        commit('setProductId', productId);
    },

    setPaymentType({ commit }, paymentType) {
        commit('setPaymentType', paymentType);
    },

    setStripeCheckout({ commit }, stripeCheckout) {
        commit('setStripeCheckout', stripeCheckout);
    },

    setStripeCheckoutType({ commit }, stripeCheckoutType) {
        commit('setStripeCheckoutType', stripeCheckoutType);
    },

    setStripeEmail({ commit }, stripeEmail) {
        commit('setStripeEmail', stripeEmail);
    },

    makeOrder({ state, commit, rootState }) {
        let url;
        if (state.order.paymentType === 'stripe') {
            url = '/api/ear/init-payment-stripe';
        } else {
            // options.payment_type === 'coinbase'
            url = '/api/ear/init-payment-coinbase';
        }
        axios.post(url, {
                eos_account_name: state.order.eosAccountName,
                email_address: state.order.emailAddress,
                owner_public_key: state.order.ownerPublicKey,
                active_public_key: state.order.activePublicKey,
                product_id: state.order.productId,
                payment_type: state.order.paymentType,
                lang: rootState.multiLanguage.lang,
            }).then((response) => {
                const payload: OrderEntity = response.data.data;
                if (response.data.code === '200') {
                    const order = payload;
                    commit('setOrderId', order.orderId);
                    if (order.stripePublicKey) {
                        commit('setStripePublicKey', order.stripePublicKey);
                    }
                    if (order.coinbaseCheckout) {
                        commit('setCoinbaseCheckout', order.coinbaseCheckout);
                    }
                    // return {code: 'OK', msg:''}
                 } else {
                    commit('orderError', response.data.msg);
                 }
            }, (error) => {
                commit('orderError', error);
            });
    },

   async getOrder({
        state,
        commit,
        rootState,
    }) {
        axios.post('/api/ear/get-order', {
                order_id: state.order.orderId,
                lang: rootState.multiLanguage.lang,
            }).then((response) => {
                if (response.data.code === '200') {
                    const payload: OrderEntity = response.data.data;
                    commit('setOrderStatus', payload.orderStatus);
                    commit('setOrderStatusLabel', payload.orderStatusLabel);
                    // return 'OK';
                } else {
                    commit('orderError', response.status);
                }
            }, (error) => {
                commit('orderError', error);
            });
    },

    paymentStripe({
        state,
        commit,
        rootState,
    }) {
        axios.post(
            '/api/ear/payment-stripe', {
                order_id: state.order.orderId,
                product_id: state.order.productId,
                stripeToken: state.order.stripeCheckout,
                stripeTokenType: state.order.stripeCheckoutType,
                stripeEmail: state.order.stripeEmail,
                lang: rootState.multiLanguage.lang,
            }).then((response) => {
            const returnValue = response.data;
            if (returnValue.code !== '200') {
                commit('orderError', returnValue.msg);
            }
        }, (error) => {
            commit('orderError', error);
        });
    },

    setMailVerifyFlg({ commit }, mailVerifyFlg) {
        commit('setMailVerifyFlg', mailVerifyFlg);
    },

    setAccountNameExistFlg({ commit }, accountNameExistFlg) {
        commit('setAccountNameExistFlg', accountNameExistFlg);
    },

};
