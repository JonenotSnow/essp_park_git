
<template>
    <div class="essp-home-card">
        <div class="inter">
            <img :src="url" height="45" width="45" class="img" alt="" @error="defaultImg">
            <p class="person"><span class="name">{{name}}</span><span class="role">{{role}}</span></p>
        </div>
        <p class="company">{{company}}</p>
    </div>
</template>
<script>
import imgfault from '@/assets/imgs/avatar.jpg'
export default {
    name: "homeCard",
    props: {
        url: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        role: {
            type: String,
            default: ''
        },
        company: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
        }
    },
    methods: {
        defaultImg(event) {
            var ele = event.currentTarget;
                ele.src = imgfault;
                ele.title = "默认配图";
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>
