import { MutationTree } from 'vuex';
import { OrderState } from './types';

export const mutations: MutationTree<OrderState> = {
    setEosAccountName(state, eosAccountName) {
        state.order.eosAccountName = eosAccountName;
    },

    setEmailAddress(state, emailAddress) {
        state.order.emailAddress = emailAddress;
    },

    setOwnerPublicKey(state, ownerPublicKey) {
        state.order.ownerPublicKey = ownerPublicKey;
    },

    setActivePublicKey(state, activePublicKey) {
        state.order.activePublicKey = activePublicKey;
    },

    setProductId(state, productId) {
        state.order.productId = productId;
    },

    setPaymentType(state, paymentType) {
        state.order.paymentType = paymentType;
    },

    setStripeCheckout(state, stripeCheckout) {
        state.order.stripeCheckout = stripeCheckout;
    },

    setStripeCheckoutType(state, stripeCheckoutType) {
        state.order.stripeCheckoutType = stripeCheckoutType;
    },

    setOrderId(state, orderId) {
        state.order.orderId = orderId;
    },

    setStripePublicKey(state, stripePublicKey) {
        state.order.stripePublicKey = stripePublicKey;
    },

    setCoinbaseCheckout(state, coinbaseCheckout) {
        state.order.coinbaseCheckout = coinbaseCheckout;
    },

    setStripeEmail(state, stripeEmail) {
        state.order.stripeEmail = stripeEmail;
    },

    setOrderStatus(state, orderStatus) {
        state.order.orderStatus = orderStatus;
    },

    setOrderStatusLabel(state, orderStatusLabel) {
        state.order.orderStatusLabel = orderStatusLabel;
    },

    setMailVerifyFlg(state, mailVerifyFlg) {
        state.order.mailVerifyFlg = mailVerifyFlg;
    },

    setAccountNameExistFlg(state, accountNameExistFlg) {
        state.order.accountNameExistFlg = accountNameExistFlg;
    },
    orderError(state, errors) {
        // console.log('customer-search.store.handleError');
        state.errors = errors;
    },
};
