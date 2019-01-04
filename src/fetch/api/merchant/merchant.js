//园区物业的接口文件
export const merchant = {
   // 合同管理
   addContractInfo:'/contractInfo/addContractInfo', // 新增合同
   updateContractInfo:'/contractInfo/updateContractInfo',// 更新合同
   getContractList:'/contractInfo/getContractInfoPage',// 获取合同列表
   discardContractInfo:'/contractInfo/deleteContractInfo',// 退租合同
   // 招商信息管理
   updateAttractInvestInfo:'/parkInnovation/updateAttractInvestInfo', // 新增,变更招商信息
   getAttractInvestInfoList:'/parkInnovation/getAttractInvestInfo',// 获取招商列表
   discardInnovationInfo:'/parkInnovation/deleteAttractInvestInfo',// 删除招商信息
   // 维护人员信息管理(废弃)
   addMaintenanceManInfo:'/maintenanceManInfo/addMaintenanceManInfo', //新增维护人员信息
   updateMaintenanceManInfo:'/maintenanceManInfo/updateMaintenanceManInfo', // 更新维护人员信息
   getMaintenanceManInfoPage:'/maintenanceManInfo/getMaintenanceManInfoPage',// 获取维护人员信息
   deleteMaintenanceManInfo:'/maintenanceManInfo/deleteMaintenanceManInfo',// 删除维护人员信息
   // 维修报表管理
   addTenementRepairInfo:'/tenementRepairInfo/addTenementRepairInfo',//新增
   updateTenementRepairInfo:'/tenementRepairInfo/updateTenementRepairInfo',//更新
   getTenementRepairInfoPage:'/tenementRepairInfo/getTenementRepairInfoPage',// 获取列表
}