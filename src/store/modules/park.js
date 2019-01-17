
// initial state
// 状态值
const state = {
    navIndex:'0'
}

// mutations
const mutations = {
    changeNavIndex (navIndex) {
        return navIndex;
    },
}

// actions
const actions = {
    commitNavIndex ({ commit }) {
        commit('changeNavIndex', products)
    }
}

// getters
const getters = {

}




export default {
    state,
    getters,
    actions,
    mutations
}
