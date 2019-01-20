import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {parkRouter1} from "./park.js"
import newsinfo from './newsinfo.js'
import sciAndTechPolicy from './sciAndTechPolicy.js'
import officeHall from './officeHall.js'
import commonComponents from './commonComponents.js'

var parkToal = [];
parkToal.push(parkRouter1,newsinfo, sciAndTechPolicy, officeHall,commonComponents);


export default new Router({
    mode: 'hash',
    routes: parkToal,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
