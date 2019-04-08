import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import isBdPark from "../util/isBdPark";

import bzRouter from './bzRouter/index'
import bdRouter from './bdRouter/index'

let curRouter = isBdPark.isBdPark()?bdRouter:bzRouter || [];

export default new Router({
    mode: 'hash',  
    routes:curRouter,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
