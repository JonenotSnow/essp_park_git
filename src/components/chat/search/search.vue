<!-- 搜索框 -->
<template>
	<div class="searchIndex">
		<el-input placeholder="搜索" v-model="search" @input="change" type="text">
			<i class="el-icon-search" slot="prefix"></i>
		</el-input>
	</div>
</template>

<script>
	export default {
		methods: {
			change() {
				this.$store.dispatch('search', this.search)
			},
			del() {
				this.search = ''
				this.change()
			}
		},
		data() {
			return {
				search: '',
				active: false
			}
		},
		computed: {
			noText() {
				if(this.search === '') return true
				return false
			},
			haveText() {
				if(this.search === '') return false
				return true
			}
		}
	}
</script>

<style lang="less">
	.searchIndex{
	    padding: 16px 20px 6px 16px;
	    .el-input__inner{
	    	border-radius:8px;
	    	height:32px;
	    	line-height: 32px;
	    }
	    .el-input__prefix{
	    	margin-left: 4px;
	    	.el-icon-search{
		    	padding-top: 8px;
		    }
	    }
	}
</style>