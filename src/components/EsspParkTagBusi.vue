<template>
    <div class="essp-park-tag-busi__wrap">
        <p class="tag-p tag-title">{{tagBusiName}}：</p>
        <div class="tag-div tag-main">
            <div class="tag-single-line" v-if="oomTag === 'one'">
                <essp-park-tag
                    v-for="(item, index) in tagList"
                    :value="item"
                    :key="index"
                />
            </div>

            <div class="tag-mul-line" v-if="oomTag === 'mul'">
                <essp-park-tag
                    v-for="(item, index) in tagList"
                    :value="item"
                    :key="index"
                />
            </div>
        </div>
        <p class="tag-p tag-foot" @click="showOneOrMulTags()" v-if="showAllBtnTag">
            <span>展开全部<i></i></span>
        </p>
    </div>
</template>

<script>
    import EsspParkTag from "@/components/EsspParkTag";

    export default {
        name: 'essp-park-tag-busi',
        props: {
            tagBusiName: {
                type: String,
                default: '惠政标签'
            },
            tagMainWidth: {
                type: String,
                default: "900"
            },
            tagList: {
                type: Array,
                default: []
            }
        },
        components: {
            EsspParkTag
        },
        data() {
            return {
                msg: 'essp-park-tag-busi',

                // 标签展示标记
                oomTag: 'one',

                // 展示全部按钮标记
                showAllBtnTag: false
            }
        },
        methods: {
            /**
             * 显示一行还是多行标签的相关事件
             */
            // “展开全部”事件
            showOneOrMulTags() {
                if (this.oomTag === 'one') {
                    return this.oomTag = 'mul';
                }
                if (this.oomTag === 'mul') {
                    return this.oomTag = 'one';
                }
            }
        },
        mounted() {

            // 设置
            this.$nextTick(() => {
                let tagMain = document.getElementsByClassName('tag-main');
                tagMain[0].style.width = parseInt(this.tagMainWidth) + 'px';

                let esspParkTagWrap = document.getElementsByClassName('essp-park-tag__wrap');
                let esspParkTagWrapWidth = null;
                for (let i = 0; i < esspParkTagWrap.length; i++) {
                    esspParkTagWrapWidth += esspParkTagWrap[i].clientWidth;
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
    .essp-park-tag-busi__wrap {
        .tag-p {
            display: inline-block;
            vertical-align: top;
            height: 30px;
            line-height: 30px;
            letter-spacing: 0px;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            color: #666666;
        }
        .tag-title {

        }
        .tag-main {
            display: inline-block;
            vertical-align: top;
            height: auto;
            line-height: 30px;
            letter-spacing: 0px;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            color: #666666;
            .tag-single-line {
                height: 30px;
                line-height: 30px;
                overflow: hidden;
            }
            .tag-mul-line {
            }
        }
        .tag-foot {
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            span {
                display: inline-block;
                padding: 0 18px;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                &:hover {
                    color: #36c0ff;
                    cursor: pointer;
                }
            }
        }
    }
</style>
