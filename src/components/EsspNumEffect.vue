<template>
	<div class="account-num">
		<el-row>
			<el-col :span="8">
				<div class="grid-content bg-purple">
					<div class="num">
						<span>{{rqmTotal_show}}</span>
					</div>
					<div class="num-intro">已发布的需求数</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-purple-light">
					<div class="num">
						<span>{{brngtgthrSuccessTotal_show}}</span>
					</div>
					<div class="num-intro">已完成的撮合数</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-purple">
					<div class="num">
						<span>{{userTotal_show}}</span>
					</div>
					<div class="num-intro">平台用户数</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { apiUrl } from "@/fetch/apiUrl.js";
	import TWEEN from 'tween.js';
	export default {
		name: 'dataSupport',
		computed: {

		},
		data() {
			return {
				num1: 0,
				rqmTotal: 0, // -已发布需求数
				rqmTotal_show: 0,
				num2: 0,
				brngtgthrSuccessTotal: 0,  //-已完成戳合数
				brngtgthrSuccessTotal_show: 0,
				num3: 0,
				userTotal: 0,  // -用户数
				userTotal_show: 0,
			}
		},
		watch: {
			num1: function(newValue, oldValue) {
				var vm = this

				function animate(time) {
					requestAnimationFrame(animate)
					TWEEN.update(time)
				}
				new TWEEN.Tween({
						tweeningNumber: oldValue
					})
					.easing(TWEEN.Easing.Quadratic.Out)
					.to({
						tweeningNumber: newValue
					}, 3000)
					.onUpdate(function() {
						vm.rqmTotal_show = this.tweeningNumber.toFixed(0)
					})
					.start()
				animate()
			},
			num2: function(newValue, oldValue) {
				var vm = this

				function animate(time) {
					requestAnimationFrame(animate)
					TWEEN.update(time)
				}
				new TWEEN.Tween({
						tweeningNumber: oldValue
					})
					.easing(TWEEN.Easing.Quadratic.Out)
					.to({
						tweeningNumber: newValue
					}, 3000)
					.onUpdate(function() {
						vm.brngtgthrSuccessTotal_show = this.tweeningNumber.toFixed(0)
					})
					.start()
				animate()
			},
			num3: function(newValue, oldValue) {
				var vm = this

				function animate(time) {
					requestAnimationFrame(animate)
					TWEEN.update(time)
				}
				new TWEEN.Tween({
						tweeningNumber: oldValue
					})
					.easing(TWEEN.Easing.Quadratic.Out)
					.to({
						tweeningNumber: newValue
					}, 3000)
					.onUpdate(function() {
						vm.userTotal_show = this.tweeningNumber.toFixed(0)
					})
					.start()
				animate()
			},
		},
		methods: {
			setAnimatedNum() {
//				this.num1 = 35678;
//		      	this.num2 = 999;
//		     	this.num3 = 100;
				this.num1 = this.rqmTotal
				this.num2 = this.brngtgthrSuccessTotal
				this.num3 = this.userTotal
			},
			setNum(){
				this.rqmTotal_show = this.rqmTotal;
				this.brngtgthrSuccessTotal_show = this.brngtgthrSuccessTotal
				this.userTotal_show = this.userTotal
			},
			handleScroll() {
				let windowH = document.body.clientHeight
				let docSrollTop = $(document).scrollTop() //文档卷动值
				let clientH = $(window).height() //视窗大小
				let sectionTop = $(".account-num").offset().top //动态文字模块距离文档头部的距离
				let sectionH = $(".account-num").height()
				if((docSrollTop + clientH - sectionTop) >= 0 && (docSrollTop - sectionTop - sectionH) <= 0) {
					if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
        				this.setNum();
	    			} else{
	    				this.setAnimatedNum()
	    			}
				}
			},
			getNums(){
				let vm = this;
				this.$post(this.$apiUrl.home.getNums, {})
				.then((response) => {
					vm.brngtgthrSuccessTotal = response.resultData.brngtgthrSuccessTotal;
					vm.rqmTotal = response.resultData.rqmTotal;
					vm.userTotal = response.resultData.userTotal;
                    this.handleScroll();
				})
			},
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
		},
		created() {
			this.getNums();
		},
		destroyed: function() {
			window.removeEventListener("scroll", this.handleScroll);
		},
	}
</script>

<style lang="less" scoped="scoped">
	.account-num {
		width: 80%;
		margin: 0 auto;
		text-align: center;
		//display: inline-block;
		.num {
			font-style: italic;
			font-size: 64px;
			color: #26a4fa;
			font-family: PingFangSC-Regular;
		}
		.num-intro {
			margin-top: 10px;
			font-size: 16px;
			color: #666666;
		}
	}
</style>
