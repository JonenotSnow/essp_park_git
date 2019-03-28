<template>
    <div class='EsspTagManage'>
        <span class="title">{{tagBusiName}}：</span>
        <div class="tagList" :class="tagLineChange">
            <span class="self-tag" v-for="(it,i) in tagList" :key="i" :class="{'active':it.done}" @click="getMemByTblTxt(it,i)" >
                {{it.tagTxt}}&nbsp;({{it.tagCount}})
                <i v-if="curSelectTag == it.tagId" class="el-icon-close" @click="deleteTag(it)"></i>
            </span>
        </div>
        <span class="more" @click="showOneOrMulTags" v-if="showAllBtnTag">
            More<i class="el-icon-arrow-down" :class="{'tran':oomTag === 'one'}"></i>
        </span>
    </div>
</template>

<script>

    export default {
        name: 'EsspTagManage',
        props: {
            tagBusiName: {
                type: String,
                default: '我的分类'
            },
            tagMainWidth: {
                type: String,
                default: "815"
            },
            tagList: {
                type: Array,
                default: []
            },
            pageSize: {
                type: Number,
                default: 5
            },
            pageNum: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                // 标签展示标记
                oomTag: 'one',

                // 展示全部按钮标记
                showAllBtnTag: true,
                curSelectTag:''
            }
        },
        computed: {
            tagLineChange() {
                return this.oomTag === 'one' ? {'tag-single-line': true} : {'tag-mul-line': true};
            }
        },
        methods: {
            /**
             * 显示一行还是多行标签
             */
            showOneOrMulTags() {
                return this.oomTag === 'one' ? this.oomTag = 'mul' : this.oomTag = 'one';
            },

            /**
             * 通过类名获取元素集合
             * @param className
             * @returns {HTMLCollectionOf<Element>}
             */
            esspGetElByClassName(className) {
                return document.getElementsByClassName(className);
            },
            //全局标签查询
            getMemByTblTxt(v,i){
                this.curSelectTag = v.tagId;
                //标准版 全局标签点击切换
                this.tagList.forEach((item,index)=>{
                    if(index == i){
                        item.done = !item.done;
                        if (!item.done) {
                            this.curSelectTag = ''
                            this.$emit('getMemInfo')
                            return;
                        }
                    }else{
                        item.done = false;
                    }
                });
                this.$post(this.$apiUrl.manage.getMemByTblTxt,{
                        parkId : window.sessionStorage.getItem("parkId"),
                        lblTxt : v.tagTxt,
                        pageSize : this.pageSize,
                        pageNum : this.pageNum
                    })
                    .then((response) => {
                        this.$emit('getChildData',{
                            'memberList':response.resultData && response.resultData.memberList,
                            'totalCount':response.resultData && response.resultData.totalCount
                        })
                    },(err)=>{
                        this.$message({
                            type: 'warning',
                            message: err.resultMsg
                        })
                    })
            },
            //标签删除弹窗
            deleteTag(v){
                // deleteType 0 删除我的分类中的全局标签 1 删除成员中的标签
                let params = {
                   'accessT':'true',
                   'deleteType':0,
                   'curSelectTag':v.tagId,//当前删除全局标签id
                   'curSelectTxt':v.tagTxt,//当前删除全局标签文本
                   'curSelectTagTp':v.tagTp,//当前删除全局标签tagTp
                   'delectUserData':[],//当前删除企业标签总列表
                }
                this.$emit('openDelPop',params);
            },
        },
        mounted() {
            this.$nextTick(() => {

                let tagMain = this.esspGetElByClassName('tagList');
                tagMain[0].style.width = parseInt(this.tagMainWidth) + 'px';

                let esspParkTagWrap = this.esspGetElByClassName('self-tag');
                let i = 0;
                let esspParkTagWrapLength = esspParkTagWrap.length;

                // 通过标签组件的总长度来判断是一行显示还是多行显示
                let esspParkTagWrapWidth = null;
                for (; i < esspParkTagWrapLength; i++) {
                    esspParkTagWrapWidth += esspParkTagWrap[i].clientWidth + 20;
                }
                if (esspParkTagWrapWidth > this.tagMainWidth) {
                    return this.showAllBtnTag = true;
                }

            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .EsspTagManage{
        margin:15px 0;
        line-height: 54px;
        overflow: hidden;
        &>span{
            float: left;
            margin-left:20px;
            line-height: 20px;
        }
        .tagList{
            float: left;
            &>span{
                float: left;
                margin-left:20px;
                margin-bottom:20px;
                line-height: 20px;
                display:inline-block;
                text-align: center;
                font-size: 12px;
                // min-width:80px;
                height: 20px;
                padding: 2px 12px;
                background: #fff;
                color:#666;
                border-radius: 12px;
                cursor: pointer;
                &.active{
                    background-color: #33bcfe;
                    color:#fff;
                }
                &:hover{
                    background-color: #33bcfe;
                    color:#fff;
                }
            }
            &.tag-single-line {
                height: 30px;
                line-height: 30px;
                overflow: hidden;
            }
        }
        .more{
            float: right;
            color: #666;
            font-size: 14px;
            cursor: pointer;
            margin-right:10px;
            &:hover{
                background-color: #fff;
                color: #666666;
            }
            i{
                transform:  rotate(0);
                transition: .5s;
                &.tran{
                    transform: rotate(180deg);
                }
            }
        }
    }
</style>
