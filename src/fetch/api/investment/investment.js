//园区招商的接口文件
export const investment = {
    addInvest :'/parkInnovation/updateAttractInvestInfo',//新增商机接口
    getAttractInvestInfo:'/parkInnovation/getAttractInvestInfo',//商机列表（储备，在谈，已成交，搁置）
    getMyAttractInfo:'/parkInnovation/getMyAttractInfo',//查询我的商机列表
    getAttracById:'/parkInnovation/getAttracById',//商机详情
    deleteAttractInvestInfo:'/parkInnovation/deleteAttractInvestInfo',//删除商机
    addAttractFollow:'/attractFollow/addAttractFollow',//编辑切换商机状态（储备0，在谈1，已成交2，搁置3）

}
