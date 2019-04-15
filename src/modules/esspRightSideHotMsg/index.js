import hotMessage from './hotMessage'

hotMessage.install = function(Vue) {
    Vue.component(hotMessage.name, hotMessage)
}
export default hotMessage