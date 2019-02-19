import axios from 'axios';
import {Message} from "element-ui";

import {storeApi} from "../../fetch/storeApi/storeApi";

// initial state
// 状态值
const state = {
    apiUrl:{},
    searchState:false,
    selectItem:{
        id:'park_activity',
        name:'活动'
    },
    allLoading:false,
    searchPageData:{
        searchData:[],
        allTotal:0
    }
}

// mutations
const mutations = {
    //顶部导航搜索按钮的显示和隐藏
    getSearchState(state,payload){
        state.searchState = payload.show;
    },
    //顶部导航搜索选项
    getSelectItem(state,payload){
        state.selectItem = payload;
    }
}

// actions
const actions = {
    //搜索页列表数据
    async getSearchPageData(context,payload) {
        let url = '';
        let type = state.selectItem.id
        //活动
        if (type == "park_activity") {
            url = storeApi.getAllActivity;
        }
        //惠政
        if (type == "park_gover") {
            url = storeApi.getAllPolicy;
        }
        //资讯
        if (type == "park_information") {
            url = storeApi.getAllInformation;
        }
        var pop = payload.pop;
        state.allLoading = payload.loading;
        await axios.post(url, pop).then(response => {
            state.allLoading = false;
            if (response.resultCode ==  "CLT000000000" || response.data.resultCode == "0000000000") {
                if (type == "park_activity") {
                    state.searchPageData.searchData = response.data.resultData.activityList;
                }else if(type == "park_gover"){
                    state.searchPageData.searchData = response.data.resultData.policyList;
                }else{
                    state.searchPageData.searchData = response.data.resultData.informationList;
                }
                state.searchPageData.allTotal = response.data.resultData.total; //总条数
            } else {
                Message.info(response.resultMsg);
            }
            },err => {
                Message.error("接口异常");
            }
        );
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
