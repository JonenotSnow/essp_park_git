
// initial state
// 状态值
const state = {
    searchState:false
}

// mutations
const mutations = {
    //顶部导航搜索按钮的显示和隐藏
    getSearchState(state,payload){
        state.searchState = payload.show;
    }
}

// actions
const actions = {
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
