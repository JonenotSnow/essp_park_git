import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import isBdPark from "../util/isBdPark";

import bdRouter from './bdRouter/index'
import standardRouter from './standardRouter/index'

let curRouter = isBdPark.isBdPark()?bdRouter:standardRouter || [];


console.log('curRouter***************************************************************************')
console.log(curRouter)

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
