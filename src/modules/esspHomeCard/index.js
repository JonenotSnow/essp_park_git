/*
 * @method                  卡片
 * @param {String} [url = '']     img图片路径    {String} [role = '']     角色  {String} [company = '']     企业名称
 * @return  无
 * @author  yanghoucheng
 * @editUser   
 */

import homeCard from './homeCard'

homeCard.install = function(Vue) {
    Vue.component(homeCard.name, homeCard)
}

export default homeCard