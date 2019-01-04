export const processTrack = {
    getProjects: '/space/getProjects',           // 根据parkId获取项目列表
    getBuildings: '/space/getBuildings',         // 根据项目Id获取楼宇列表,
    getRooms: '/space/getRooms',             // 根据楼宇id获取房间列表
    getProjectById: '/space/getProjectById',    // 根据id获取项目
    getBuildingById: '/space/getBuildingById', // 根据id获取楼宇
    getRoomById: '/space/getRoomById',          // 根据id获取房间号
    addAttractFollow:'/attractFollow/addAttractFollow',  // 新增跟进信息
    getAttractInvestInfo: '/parkInnovation/getAttractInvestInfo',  // 查询商机列表
    getAttractFollowPage:'/attractFollow/getAttractFollowPage',    // 跟进信息列表
    getPManagerByParkId:'/common/getPManagerByParkId',          // 获取园区管理员列表
}
