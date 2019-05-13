import axios from 'axios';

export default {
    getMultiLanguages(options: any, cb: any) {
        axios
            .post('/api/sic/get-multi-language', {
                system_name: 'ear',
                lang: options.lang
            })
            .then(response => {
                if (response.data.code == '200') {
                    cb(response.data.data);
                }
            })
            .catch(error => console.log(error));
    },

    getProduct(options: any, cb: any) {
        axios
            .post('/api/ear/get-product', {
                lang: options.lang
            })
            .then(response => {
                if (response.data.code == '200') {
                    cb(response.data.data);
                }
            })
            .catch(error => console.log(error));
    },

    makeOrder(options: any, cb: any) {
        let url;
        if (options.payment_type === 'stripe') {
            url = '/api/ear/init-payment-stripe';
        } else {
            // options.payment_type === 'coinbase'
            url = '/api/ear/init-payment-coinbase';
        }

        axios
            .post(url, {
                eos_account_name: options.eos_account_name,
                email_address: options.email_address,
                owner_public_key: options.owner_public_key,
                active_public_key: options.active_public_key,
                product_id: options.product_id,
                payment_type: options.payment_type,
                lang: options.lang
            })
            .then(response => {
                cb(response.data);
            })
            .catch(error => console.log(error));
    },

    paymentStripe(options: any, cb: any) {
        axios
            .post(
                '/api/ear/payment-stripe', {
                    order_id: options.order_id,
                    product_id: options.product_id,
                    stripeToken: options.stripeToken,
                    stripeTokenType: options.stripeTokenType,
                    stripeEmail: options.stripeEmail,
                    lang: options.lang
                }
            )
            .then(response => {
                cb(response.data);
            })
            .catch(error => console.log(error));
    },

    getOrder(options: any, cb: any) {
        axios
            .post('/api/ear/get-order', {
                order_id: options.order_id,
                lang: options.lang
            })
            .then(response => {
                if (response.data.code == '200') {
                    cb(response.data.data);
                }
            })
            .catch(error => console.log(error));
    },

    getAccount(options: any, cb: any) {
        axios
            .post('/api/ear/get-account', {
                eos_account_name: options.eos_account_name,
                lang: options.lang
            })
            .then(response => {
                if (response.data.code == '200') {
                    cb(response.data.data);
                }
            })
            .catch(error => console.log(error));
    },

    checkAccountExist(options: any, cb: any){
        axios
            .post('/api/ear/check-account-exist', {
                eos_account_name: options.eos_account_name,
                lang: options.lang
            })
            .then(response => {
                cb(response.data.code);
            })
            .catch(error => console.log(error));
    },

    checkEmailVerified(options: any, cb: any) {
        axios
            .post('/api/ear/check-email-verified', {
                email_address: options.email_address,
                lang: options.lang
            })
            .then(response => {
                cb(response.data.code);
            })
            .catch(error => console.log(error));
    },

    verifyEmailAddress(options: any, cb: any) {
        axios
            .post('/api/ear/verify-email-address', {
                email_address: options.email_address,
                confirm_code: options.confirm_code,
                lang: options.lang
            })
            .then(response => {
                cb(response);
            })
            .catch(error => console.log(error));
    },

    sendConfirmCode(options: any, cb: any) {
        axios
            .post('/api/ear/send-confirm-code', {
                email_address: options.email_address,
                lang: options.lang
            })
            .then(response => {
                cb(response.data.code);
            })
            .catch(error => console.log(error));
    },

    sendKeys(options: any, cb: any) {
        axios
            .post('/api/ear/send-keys', {
                email_address: options.email_address,
                lang: options.lang
            })
            .then(response => {
                cb(response.data.code);
            })
            .catch(error => console.log(error));
    },

    checkPublicKeys(options: any, cb: any) {
        axios
            .post('/api/ear/check-public-keys', {
                owner_public_key: options.owner_public_key,
                active_public_key: options.active_public_key,
                lang: options.lang
            })
            .then(response => {
                cb(response);
            })
            .catch(error => console.log(error));
    }
};
