/*
 * @Author: Evan-lian
 * @Date: 2019-01-03 20:13:30
 * @LastEditors: Evan-lian
 * @LastEditTime: 2019-01-04 10:35:54
 * @Description: 左侧导航栏样式配置，默认不配置走原来活动的样式，其他对应配置走特定样式逻辑，
 * 在/Users/lianjunbin/Documents/essp_park/src/components/EsspAside.vue 下配置对应风格模版即可
 */
import {guanliStyle} from "./guanliStyle"
import {sciStyle} from "./sciStyle"
import {zixunStyle} from "./zixunStyle"
const listMap = Object.assign(guanliStyle,zixunStyle,sciStyle);//只做ie9以上兼容
export const leftNavStyleSetting =listMap


