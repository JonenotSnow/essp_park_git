export default {
    data () {
      return {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
        satpType: '03',
        list: [
        ],
        searchCondition: {
            policyTitle: '',
            name: '',
            status: '',
            startDate: '',      //开始时间
            endDate: '',        //结束时间
        },
      }
    },
    created() {
        this.getList();
    },
    methods: {
        // 查询事件
        search() {
            this.getList();
        },

        // 重置事件
        reset() {
            this.searchCondition.policyTitle = '';
            this.searchCondition.name = '';
            this.searchCondition.status = '';
            this.searchCondition.startDate = '';
            this.searchCondition.endDate = '';
            this.getList();
        },
        //前往审核页面
        linkToAuditDetail(item) {
            this.$router.push({
                path: '/news/lookNewsAudit',
                query: {
                    id: item.informationId,
                    status: item.status,
                    applyType: this.entityType == 1 ? '01' : '02'
                }
            });
        },
        getList() {
            let params = {
                parkId: sessionStorage.getItem("parkId") || "",            // 园区ID
                pageNum: this.pageNum,          // 页码
                pageSize: this.pageSize,        // 每页显示数量
                startDate: this.startDate,      // 信息发布时间---开始时间
                endDate: this.endDate,          // 信息发布时间---结束时间
                title: '',                       // 标题,
                type: this.satpType,            //类型，默认03
                entityType: this.entityType,     //新闻1公告2
                // 查询用到的字段
                title: this.searchCondition.policyTitle,  // 标题名称
                name: this.searchCondition.name,        // 发布人
                status: this.searchCondition.status,            // 状态
                startDate: this.searchCondition.startDate,      // 开始时间
                endDate: this.searchCondition.endDate,          // 结束时间
            };

            this.$post("/audit/getAuditList", params).then(response => {
                let codestatus = response.resultCode;
                if (codestatus == "CLT000000000") {
                    let resultData = response.resultData;
                    this.totalCount = resultData.infomationCount;
                    this.list = resultData.infomationList;
                } else {
                    this.$message.info(response.resultMsg);
                }
            }, err => {
                this.$message.error("接口异常");
            })
        },
        /**
         * 分页相关事件
         * @param val
         */
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        }
    }
  }
  