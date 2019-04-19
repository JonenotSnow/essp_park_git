<template>
    <div class="essp-park-search">
        <!-- 标签切换 -->
        <div v-if="hasTag" class="essp-type">
            <ul class="type-ul esspclearfix">
                <li v-for="(item, index) in tagList" :key="index" @click="tagClickFun(item)" :class="{'active': tagModel === getValueKey(item, tagKey)}">
                    {{getValueKey(item, tagName)}}
                </li>
            </ul>
        </div>
        <!-- 搜索条件 -->
        <div class="essp-search esspclearfix">
            <div class="main">
                <el-select class="select" v-model="hot" placeholder="全部" @change="hotChange" v-if="hasHot" size="medium">
                    <el-option
                    v-for="(item, index) in hotList"
                    :key="index"
                    :value="getValueKey(item, hotKey)">
                    <span style="float: left">{{ getValueKey(item, hotName) }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ getValueKey(item, hotCount) }}</span>
                    </el-option>
                </el-select>
                <el-select class="select" v-model="type" @change="typeChange" placeholder="全部状态" v-if="hasType" size="medium">
                    <el-option
                    v-for="(item, index) in typeList"
                    :key="index"
                    :label="getValueKey(item, typeName)"
                    :value="getValueKey(item, typeKey)">
                    </el-option>
                </el-select>
                    
                <el-date-picker
                    class="picker"
                    v-model="date"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="medium"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="dataChange"
                    :picker-options="pickerOptions2">
                </el-date-picker>
                <el-button @click="searchClick" type="primary" size="medium">查询</el-button>
                <button class="reset-btn" @click="resetClick">重置</button>
                <div class="search">
                    <input type="text" class="input" @focus="searchEnter" placeholder="请输入搜索内容" v-model="mark" />
                    <i class="iconfont search-icon" @click="searchClick">&#xe63a;</i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { classtType } from "../../util/classtType";

export default {
    name: 'parkSearch',
    props: {
        hasTag: Boolean, //是否展示标签
        tagKey: { //类型值字段
            type: String,
            default: 'id'
        },
        tagName: { //类型展示字段
            type: String,
            default: 'name'
        },
        tagModel: { //类型model
            type: String,
            default: ''
        },
        tagList: { //类型数据
            type: Array,
            default: () => {
                return classtType.activetType
            }
        },

        hasType: Boolean, //是否展示类型下拉框
        typeModel: { //类型参数model
            type: String,
            default: ''
        },
        typeKey: { //类型值字段
            type: String,
            default: 'name'
        },
        typeName: { //类型展示字段
            type: String,
            default: 'label'
        },
        typeList: { //全部类型数据1. 预告中  2. 报名中  3. 已结束
            type: Array,
            default: () => {
                return [{
                    name: "1",
                    label: "预告中"
                }, {
                    name: "2",
                    label: "申报中"
                }, {
                    name: "3",
                    label: "已结束"
                }]
            }
        },

        hasHot: Boolean, //是否展示热门下拉框
        hotModel: { //热门参数model
            type: String,
            default: ''
        },
        hotKey: { //热门值字段
            type: String,
            default: 'name'
        },
        hotName: { //热门展示字段
            type: String,
            default: 'label'
        },
        hotCount: { //热门展示数字字段
            type: String,
            default: 'num'
        },
        hotList: { //标签数据
            type: Array,
            default: () => {
                return []
            }
        },

        dateModel: { //日期model
            type: Array,
            default: () => {
                return []
            }
        },
        markModel: { //搜索框
            type: String,
            default: ''
        },
    },
    data() {
        return {
            pickerOptions2: {  //日期快速选择自定义
                shortcuts: [{
                    text: '近三天',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            hot: '',
            type: '',
            date: [],
            mark: ''
        }
    },
    watch: {
        hotModel(val, oldval) {
            this.hot = val
        },
        typeModel(val, oldval) {
            this.type = val
        },
        dateModel(val, oldval) {
            this.date = val
        },
        markModel(val, oldval) {
            this.mark = val
        }
    },
    computed: {
        
    },
    mounted() {

    },
    methods: {
        //tab标签key值
        getValueKey(item, key) {
            return item[key]
        },
        //tab标签切换事件
        tagClickFun(item) {  
            let value = this.getValueKey(item, this.tagKey)
            this.$emit('serTagClick', value)
        },
        //热门下拉框切换
        hotChange() {
            this.$emit('serHotChange', this.hot)
        },
        //类型下拉框切换
        typeChange() {
            this.$emit('serTypeChange', this.type)
        },
        //日期选择切换事件
        dataChange() { 
            this.$emit('serDateChange', this.date)
        },
        //搜索框enter事件
        searchEnter() { 
            this.$emit('serEnter', this.mark)
        },
        //重置按钮事件
        resetClick() { 
            this.date = []
            this.mark = ''
            this.hot = ''
            this.type = ''
            this.$emit('serReset')
        },
        //查询事件
        searchClick() { 
            this.$emit('serGetList')
        },
        
    }
}
</script>
<style lang="less" scoped>
    @import './style.less';
</style>

