<template>
	<div class="essp-right-item">
		<div class="sidebar">
			<ul class="menu">
				<li class="vid" @click="showingGuideVideo = true">
					<img src="../assets/imgs/home/vid.png"/>
				</li>
				<li class="down">
					<img src="../assets/imgs/home/down.png"/>
					<div class="down-app">
						<img src="../assets/imgs/home/jrzh-app.jpg" />
					</div>
				</li>
				<li class="phone">
					<img src="../assets/imgs/home/phone.png"/>
					<div class="phone-txt">
						<img src="../assets/imgs/home/phone-num.png" />
					</div>
				</li>
				<li class="back" v-show="showBack" @click="toTop">
					<img src="../assets/imgs/home/back.png"/>
				</li>
			</ul>
		</div>
		<el-dialog custom-class="video-dialog"  :visible.sync="showingGuideVideo"  :show-close="false" :lock-scroll="true" :append-to-body="true">
			<div class="banner-img">
				<video class="video-content" :src="video.videoSrc" :poster="video.videoImg" :autoplay="video.playStatus" :loop="video.loop"  controls>
					your browser does not support the video tag
				</video>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed: {
			
		},
		data() {
			return {
				showingGuideVideo:false,
				showBack: false,
				video:{
					videoSrc:'http://want.ccb.com/essp/upload/advert/平台介绍.mp4',
            		videoImg:'',
					playStatus:'autoplay',
					loop:true,
				},
			}
		},
		methods: {
			scrollHandle(){
				let scorllTop = window.pageYOffset || document.documentElement.scorllTop || document.body.scorllTop;
				if(scorllTop > 538) {
					this.showBack = true;
				} else {
					this.showBack = false;
				}
			},
			toTop(){
				// - 回到滚动顶部
				document.body.scrollTop = 0
	        	document.documentElement.scrollTop = 0
			},
			showChat(){
				// -聊天功能展示
				//onsole.log('showChat');
			}
		},
		mounted() {
			window.addEventListener("scroll", this.scrollHandle);
		},
		destroyed: function() {
			window.removeEventListener("scroll", this.scrollHandle);
		},
	}
</script>

<style lang="less">
	.video-dialog{
		background-color: transparent !important;
		display: flex;
		justify-content: center;
		border: none;
		.el-dialog__header{
			padding: 0 !important;
		}
		.el-dialog__body {
			padding: 0 !important;
		}
		.video-content{
			width:100%;
			height: 100%;
			object-fit: fill;
			border: 10px solid #ffffff;
		}
	}
</style>

<style lang="less" scoped>
	.sidebar{
		display: block;
		.menu{
		    position: fixed;
            right: 8px;
            top: 120px;
		    z-index: 99;
		    margin-left: 496px;
		    width: 60px;
		    li{
		    	position: relative;
			    display: block;
			    margin-bottom: 2px;
			    width: 60px;
			    cursor: pointer;
		    }
		    .back{
		    	margin-top: 46px;
		    }
		    .down{
		    	.down-app{
		    		display: none;
		    		position: absolute;
					width: 140px;
					height: 140px;
		    		// height: 185px;
	    		    right: 66px;
	    		    cursor: default;
	    		    top: 0;
	    		    img{
	    		    	width: 100%;
	    		    	height: 100%;
	    		    }
		    	}
		    }
		    .down:hover .down-app{
		    	display: block;
		    }
		    .phone{
		    	.phone-txt{
		    		display: none;
		    		position: absolute;
		    		width: 299px;
		    		height: 57px;
	    		    right: 66px;
	    		    cursor: default;
	    		    top: 0;
	    		    img{
	    		    	width: 100%;
	    		    	height: 100%;
	    		    }
		    	}
		    }
		    .phone:hover .phone-txt{
		    	display: block;
		    }
		}
	}
</style>