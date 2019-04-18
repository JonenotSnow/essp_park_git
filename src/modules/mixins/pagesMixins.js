export default {
    data() {
        return {
            pageRanges: [5, 10, 20, 50, 100], //默认每页10条数区间
            pageNum: 1, //当前页码
            pageSize: 10, //每页条数
            allTotal: 0, //总条数
        }
    },
    methods: {
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