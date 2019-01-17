
// initial state
// 状态值
const state = {
    navIndex:'0'
}

// mutations
const mutations = {
    adminParkList (state, products) {
        state.navIndex = products
    },
}

// actions
const actions = {
    getAdminParkList ({ commit }) {
        commit('adminParkList', products)
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
