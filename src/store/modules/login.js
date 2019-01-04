
// initial state
// 状态值
const state = {
    checkoutStatus: null,
    access_token: '',
    userInfo: {
        userName: '', // -用户姓名
        company: '', // -用户所属公司
        roleName: '', // -用户角色
        userRole: "",  // -用户角色类型
        headImg: "", // -用户头像
        userId: "",  // -用户id
        userTrueName: "", // -用户真实姓名
        cstId:''// -客户id
    },
    resource: {},
    loginState: false
}
// getters
const getters = {}

// actions
const actions = {
    clickDemo ({ commit }) {
        // 执行代码
        // commit('setProducts', products)
    }
}

// mutations
const mutations = {
    demoChangeData (state, products) {
        state.checkoutStatus = products
    },
    setUserInfo(state,data){
        state.userInfo = data
    },
    setToken(state, data) {
        state.access_token = data;
    },
    setUserInfo(state,data){
        state.userInfo.userName = data.username;

        if(data.truename){
            state.userInfo.userTrueName = data.truename;
        } else {
            state.userInfo.userTrueName = data.username;
        }

        state.userInfo.roleName = data.userRoleName;
        state.userInfo.headimg = '';
        state.userInfo.userId = data.id;
        state.userInfo.cstId = data.cstId;
        state.userInfo.company = data.cstNm;
        state.userInfo.userRole = data.userrole;
        console.log('data:',data);
    },
    setResource(state,data){
        console.log('--data:',data);
        state.resource = data;
    },
    setLoginState(state,data){
        state.loginState = data
    },
    logOut(state,data){
        state.access_token = "";
        state.userInfo.userName = "";
        state.userInfo.company = "";
        state.userInfo.roleName = "";
        state.userInfo.headImg = "";
        state.userInfo.userId = "";
        state.userInfo.userTrueName = "";
        state.userInfo.userRole = "";
        state.userInfo.cstId = "";
        state.userInfo.company = "";
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
