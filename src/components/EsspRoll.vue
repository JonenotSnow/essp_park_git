<template>
    <div class="esspRoll-wrap">
        <ul class="roll-content">
            <li :class="{anim : animate == true}"
                v-for="(item, index) in list"
                :key="index"
                ref="esspRoll"
                @click.stop="getNoticeDetail(item)"
            >
                {{item.title || item.informationTitle}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'essp-roll',
        props: {
            list: {
                type: Array,
                default: []
            }
        },
        components: {},
        data() {
            return {
                msg: 'essp-roll',
                animate: true,
                list: []
            }
        },
        methods: {
            scroll() {

                this.animate = !this.animate;

                // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                let _this = this;

                setTimeout(function () {
                    _this.list.push(_this.list[0]);
                    _this.list.shift();

                    // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                    _this.animate = !_this.animate;
                }, 0);
            },

            // 前往详情
            getNoticeDetail(item) {
                if (this.isBdPark) {
                    this.$router.push({
                        path: "/news/noticedetail",
                        query: {informationId: item.informationId}
                    });
                } else {
                    this.$router.push({
                        path: "/parkHall/manage/noAndADDetail",
                        query: {id: item.id}
                    });
                }
            }

        },
        mounted() {
            setInterval(this.scroll, 2000);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .esspRoll-wrap {
        .roll-content {
            height: 35px;
            line-height: 35px;
            overflow: hidden;
            transition: all 0.5s;
            li {
                height: 35px;
                line-height: 35px;
            }
        }

        .anim {
            transition: all 0.5s;
        }
    }
</style>
