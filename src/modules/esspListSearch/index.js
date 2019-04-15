import parkSearch from './search'

parkSearch.install = function(Vue) {
    Vue.component(parkSearch.name, parkSearch)
}

export default parkSearch