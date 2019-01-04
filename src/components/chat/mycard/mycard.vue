<!-- 最左边的选择框 -->
<template>
    <div class="mycard">
        <div class="headImg">
            <img :src="chat.user.photoUrl" class="avatar-chat">
        </div>
        <div class="nav">
        	<div class="cont" :class="{active: chat.selectCard === 1}" @click="getChat(1)">
        		<i class="icon iconfont icon-chat-msg"></i>
        		<span class="msg-chat" v-show="getMsgNum > 0" :class="{'msg-chat-line': getMsgNum > 99}">{{getMsgNum < 100? getMsgNum: '...'}}</span>
        	</div>
        	<div class="cont" :class="{active: chat.selectCard === 2}" @click="getChat(2)">
        		<i class="icon iconfont icon-address-list"></i>
        		<span class="msg-chat" v-show="getAddNum > 0" :class="{'msg-chat-line': getAddNum > 99}">{{getAddNum < 100? getAddNum: '...'}}</span>
        	</div>
        	<div class="cont" :class="{active: chat.selectCard === 3}" @click="getChat(3)">
        		<i class="icon iconfont icon-chat-sel"></i>
        		<span class="msg-chat" v-show="getSelNum > 0" :class="{'msg-chat-line': getSelNum > 99}">{{getSelNum < 100? getSelNum: '...'}}</span>
        	</div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
	import {mapGetters} from 'vuex'
    export default {
    	data(){
    		return{
    			headImg: ''
    		}
    	},
        computed: {
            ...mapState([
                'chat',
            ]),
            ...mapGetters([
                'getMsgNum',
                'getAddNum',
                'getSelNum',
            ])
        },
        methods: {
            clearSearch() {
                this.$store.dispatch('search', '')
            },
            getChat(val) {
                this.$store.dispatch('selectCard', val);
            },
        },
    }
</script>

<style lang="less" scoped>
    .mycard {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #bdbdbd;
        .headImg{
        	padding: 18px;
        	.avatar-chat {
	            width: 40px;
	            height: 40px;
	            border-radius: 100%;
	        }
        }
        .nav{
		    .cont{
			    text-align: center;
			    margin-left: 12px;
			    height: 53px;
			    
			    .iconfont{
			    	font-size: 32px;
			    }
			    &.active{
			    	background: #efefef;
			    	border-top-left-radius: 10px;
			    	border-bottom-left-radius: 10px;
			    	color: #28a4fa;
			    }
		    	.icon{
		    	    display: inline-block;
		    	    margin-top: 6px;
			    }
		    }


        }
        .msg-chat{
	    	background: #e97259;
        	border-radius: 50%;
        	border: 2px solid #e97259;
        	position: absolute;
        	z-index: 100;
        	left: 46px;
        	text-align: center;
	        color: #FFF;
	        transform: scale(0.7);
	        width: 20px;
	        height: 20px;
	    }
	    .msg-chat-line{
	    	line-height: 10px;
	    }
    }
</style>
