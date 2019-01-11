<template>
  <div class="allenterprise">
    <!-- 加入的企业模块 -->
    <div class="breadcrumbtrail">首页>入驻企业</div>
    <div class="main_inter">
        <div class="com-tit">入驻企业</div>
        <div class="com-brf">入驻企业400+家，在职人员10000+人</div>
        <div class="enterlist">
          <div class="listcon">
          	<div class="listitem" v-for="(item,index) in enterprises" :key="index" @mouseenter="showDetail(item.isShowDetail,index)" @mouseleave="showDetail(item.isShowDetail,index)">
          		<img class="enter_child" :src="item.src">
          		<div class="detailinfo" v-if="item.isShowDetail" >
          			<P>{{item.name}}</P>
          			<P>{{item.industryType}}</P>
          			<div class="checkenterprise">进入企业橱窗</div>          			
          		</div>
          	</div>
          </div>
        </div>
        <!-- 分页部分 -->
        <div class="pageList">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
      	</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    	totalCount: 0,
      pageNum: 1,
      pageSize: 5,
      enterprises:[
				{
					src: require('@/views/newparkHall/home/imgs/logo_b1.png'),
					name:'德意志银行',
					isShowDetail:false,
					industryType:'金融/IT'
				},
				{
					src: require('@/views/newparkHall/home/imgs/logo_b2.png'),
					name:'德意志银行',
					isShowDetail:false,
					industryType:'金融/IT'
				},
				{
				  src: require('@/views/newparkHall/home/imgs/logo_b3.png'),
				  name:'德意志银行',
				  isShowDetail:false,
					industryType:'金融/IT'
				},
				{
					src: require('@/views/newparkHall/home/imgs/logo_b4.png'),
					name:'德意志银行',
					isShowDetail:false,
					industryType:'金融/IT'
				},
				{
				  src: require('@/views/newparkHall/home/imgs/logo_b5.png'),
				  name:'德意志银行',
				  isShowDetail:false,
					industryType:'金融/IT'
				},
				{
				  src: require('@/views/newparkHall/home/imgs/logo_b6.png'),
				  name:'德意志银行',
				  isShowDetail:false,
					industryType:'金融/IT'
				}
			]      
    }
   
  },
  async created(){
     this.queryEnterpriseList()
  },
  computed: {
    curId(){
      return this.$route.params.id
    }
  },
	  filters: {
    
  },
  methods:{
    queryEnterpriseList(){
    	this.$post('/memberManage/getMemInfo', {
        parkId: this.SSH.getItem('parkId'),
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }).then(    	
        response => {
          if (response.resultCode == "CLT000000000") {
          	if(response.resultData.memInfoCount > 0){
							this.enterprises = response.resultData
          	}else{

          	}           
          }
        },
        response => {
          this.$message.error(response.resultMsg);
        }
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
    },
    showDetail(isTrue,index){
    	let that = this;
      that.enterprises[index].isShowDetail = !isTrue;
      console.log(that.enterprises)
    }
  }
};
</script>

<style lang='less' scoped>
  .allenterprise{
  	.breadcrumbtrail{
  		margin:44px auto 0;
  		width:1200px;
  		font-size:14px;
  		line-height: 24px;
  	}
    .main_inter{
    	width: 1200px;
    	height: 1050px;
    	background-color:#fff;
    	margin:0 auto 20px;
    	text-align: center;
    	.com-tit{
    		margin-bottom: 20px;
    		padding-top: 60px;
    		font-size: 24px;
    	}
			.com-brf{
				font-size: 16px;
			}
			.enterlist{
				.listcon{
					width: 1005px;
					margin:50px auto;
					/*margin-left: 100px;
					margin-top: 50px;*/
					border-top:1px solid #ccc;
					border-left:1px solid #ccc;
					overflow: hidden;
					.listitem{
						float: left;
		        cursor: pointer;
		        width: 200px;
						height: 150px;
						background-color: #00a0e9;
						opacity: 0.8;
						border-right: 1px solid #ccc;
						border-bottom:1px solid #ccc;
						position:relative;
						.enter_child{
							width:100%;
							height:100%;
						}
						.detailinfo{
							position:absolute;
							left:0;
							top:0;
							background-color: #00a0e9;
							opacity: 0.8;
							color:#fff;
							text-align: center;
							font-size: 18px;
							width:100%;
							height: 100%;
							p{
								margin-bottom: 14px;
							}
							.checkenterprise{
								border:1px solid #fff;
								width: 120px;
						    height: 30px;
						    margin: 0 auto;
							}
						}
						.detailinfo.cur{
							display: block;
						}
					}
				}
			}
			.pageList{
				text-align: right;
				padding-right:40px;
			}
    }
  }
</style>