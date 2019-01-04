<template>
	<div class="honor">
		<el-col :span="6" v-for="(item,index) in fileList" :key="index">
			<el-upload action="/" list-type="picture-card"
				:auto-upload="false"
				:on-remove="handleRemove"
				:file-list="item">
	            <i class="el-icon-plus"></i>
	        </el-upload>
			<el-input class="cont-input" placeholder="请输入简介" v-model="item[0].txt">
	            <i slot="suffix" class="el-icon-edit el-input__icon"></i>
	        </el-input>
		</el-col>
	</div>
</template>

<script>
	export default {
		props: {
		    fileList: {
		      	type: Array,
		      	required: true
		    },
	  	},
		data(){
			return{
				
			}
		},
        methods: {
            handleRemove(file){
            	this.$emit('deleteHonor', file);
            }
        },
    }
</script>

<style lang="less" scoped>
	.honor{
		
	}
</style>