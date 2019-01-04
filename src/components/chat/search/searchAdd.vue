<!-- 搜索框 -->
<template>
	<div class="searchIndex">
		<el-input placeholder="搜索" v-model="search" @input="change" type="text">
			<i class="el-icon-search" slot="prefix"></i>
		</el-input>
	</div>
</template>

<script>
    import bus from '../../../eventBus'
	export default {
		methods: {
			change() {
				this.$store.dispatch('searchAdd', this.search)
			},
			del() {
				this.search = ''
				this.change()
			}
		},
        beforeDestroy () {
            bus.$off('clearSearch')
        },
        mounted() {
            let vm = this;
            bus.$on("clearSearch", function (val) {
                vm.search = ''
            })
        },
		data() {
			return {
				search: this.$store.state.chat.searchAdd,
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
