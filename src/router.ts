import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CreateAccountName from '@/views/CreateAccountName';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
            path: '/',
            redirect: '/ear/can',
        },
        {
            path: '/ear',
            redirect: '/ear/can',
        },
        {
            path: '/ear/can',
            name: 'can',
            component: CreateAccountName,
        },
        {
            path: '/ear/cpk',
            name: 'cpk',
            component: CreatePublicKey
        },
        {
            path: '/ear/pay',
            name: 'pay',
            component: Payment
        },
        {
            path: '/ear/fin',
            name: 'fin',
            component: Finish
        },
        {
            path: '/*',
            redirect: '/ear/can',
        }
  ],
});
