<template>
    <div>
        <essp-head :routerTypeNum=1></essp-head>
        <router-view/>
          <!-- 使用全局footer -->
        <essp-main-footer></essp-main-footer>
    </div>
</template>

<script>
    // import EsspHead from '@/components/EsspHead';
    import EsspHead from '@/components/EsspHeadPark';
    import EsspMainFooter from '@/components/EsspMainFooter'
    export default {
        name: "",
        components: {
            EsspHead,
            EsspMainFooter
        },
        data() {
            return {
                msg: "园区首页"
            }
        },
        beforeCreate(){
            // var parkId = sessionStorage.getItem("parkId");
            // if (!parkId) {
            //     this.$router.push('/parkList');
            // }
        },
        created(){
//            this.$commonJs.tipOffMask({
//                informType: 3,      // 类型（必填）
//                byInformer: '1',    // 被举报人（必填）
//                informerEng:'dsa', // 被举报人所在企业（必填）
//                entId:'1'           //  实体编号  类似id比如 活动id， 评论id等（必填）
//            });
        }
    }
</script>


