/*
 * @method                  活动、惠政、资讯主页右侧热门活动
 * @param 
 *      {String} [mainTitle = '']     标签热门名字            
 *      {Array} [listData = []]     热门列表
 *      {String} [titleLabel = 'title']     热门列表title字段
 *      {String} [dateLabel = 'date']     热门列表时间字段
 * @return  hotItemClick   热门详情点击事件
 * @author  yanghoucheng
 * @editUser   
 */
import hotMessage from './hotMessage'

hotMessage.install = function(Vue) {
    Vue.component(hotMessage.name, hotMessage)
}
export default hotMessage