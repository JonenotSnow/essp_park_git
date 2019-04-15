import esspParkItem from './parkItem.vue'

esspParkItem.install = function(Vue) {
    Vue.component(esspParkItem.name, esspParkItem)
}
export default esspParkItem