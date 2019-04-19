/*
 * @method                  惠政、资讯、活动主页头部banner图
 * @param {String} [url = '']     img图片路径
 * @return  无
 * @author  yanghoucheng
 * @editUser   
 */

import Banner from './banner'

Banner.install = function(Vue) {
    Vue.component(Banner.name, Banner)
}

export default Banner