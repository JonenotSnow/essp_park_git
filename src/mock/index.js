var Mock = require('mockjs')
var data = Mock.mock('/api/parkManage/getParkByRealmName','post',{
    
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    resuiltCode:'000000000',
    resuiltData:{
        a:1
    },
    resuiltMsg:"返回消息"
})
// 输出结果
console.log(JSON.stringify(data, null, 4))