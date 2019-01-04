// 封装一些常用的js方法

// 引入axios
var fn = {}
import axios from 'axios'
import code from './address'

// console.log('触发',code.COM_00001)


// 切割关键字的方法
/**
 *
 * @param {*} str 要切割的字符串
 * @param {*} status 一个状态值,1返回字符串,2返回一个数组
 */
fn.Thekeyword = function(str,status){
    if(str){
        if(status == 1){
            var strData = str.replace(/,/g, ' |');
            return strData;
        }else{
            var arrData = str.split(',');
            return arrData;
        }
    }else{
        return '未添加关键字'
    }
}


// 编译省市区的方法
/**
 *
 * @param {*} val1 省份的id
 * @param {*} val2 市区的id
 * @param {*} val3 乡镇的id
 */
fn.getAddress = function(val1,val2,val3) {
    if(val1 !=null&&val2 !=null&&val3 !=null&&val1.length == 6 && val2.length == 6 && val3.length == 6){

        var data = code;
        var obj1 = null;
        var obj2 = null;
        var obj3 = null;



        for(var i = 0;i < data.COM_00001.length;i++){
            if(data.COM_00001[i].key == val1){
                obj1 = data.COM_00001[i]
            }
        }

        for(var i = 0;i < data.COM_00002.length;i++){
            if(data.COM_00002[i].key == val2){
                obj2 = data.COM_00002[i]
            }
        }

        for(var i = 0;i < data.COM_00003.length;i++){
            if(data.COM_00003[i].key == val3){
                obj3 = data.COM_00003[i]
            }
        }


        // var obj1 = data.COM_00001.find((item)=>{
        //     return val1 == item.key
        // })
        // var obj2 = data.COM_00002.find((item)=>{
        //     return val2 == item.key
        // })
        // var obj3 = data.COM_00003.find((item)=>{
        //     return val3 == item.key
        // })

        // console.log(obj1,obj2,obj3)
        return obj1.value + obj2.value + obj3.value
    }else{
        return '全国'
    }
}



// fn.codeTable = function(cb){
//     var params = {
//         codeTypeList:[
//         	{type:'JzfpAgentCorCode'},
//         	{type:"JzfpAstObj"},
//         	{type:"JzfpEntpSbjChar"},
//             {type:"JzfpLoanStatusCd"},
//             {type:"JzfpPayoutStatusCode"},
//             {type:"JzfpStockHolderType"},
//             {type:"JzfpWithEntpRel"},
//             {type:"JzfpApproveStatusCode"},
//             {type:'JzfpEntpOptcyTp'},
//             {type:'JzfpFncAplySt'},
//             {type:'JzfpLncgyTp'},
//             {type:'JzfpLnCl'},
//             {type:"COM_00001"},
//             {type:"COM_00002"},
//             {type:"COM_00003"},
//         	{type:"RZZL_00007"},
//             {type: 'JzfpOrgFirst'},
//             {type: 'JzfpIndustryType'},
//             {type: 'JzfpECLProcessSts'},
//             {type: 'JzfpBizStatusCode'},
//             {type: 'JzfpContractStatusCode'},
//             {type: 'JzfpPayoutStatusCode'},
//             {type: 'JzfpAccountSts'},
//             {type: 'JzfpFncDdlnUnit'}
//         ]
//     }
//     axios.post('/codetable/getcodeinfobytype',params).then((res)=>{
//         // console.log('触发',res)
//         cb(res.data)
//     })
// }




/**
 * 通过key值获取状态
 * @param {*} name 要获取状态的名字
 * @param {*} key  key值
 */
fn.getCodeName = function(name,key){
    if(key){
        var data =JSON.parse(window.sessionStorage.ctData).jzfpCode;
        var arr = data[name];
        var obj = null;
        // var obj = arr.find(function(item){
        //     return item.key == key;
        // })

        for(var i =0;i < arr.length;i++){
            if(arr[i].key == key){
                obj = arr[i];
            }
        }

        if(obj){
            return obj.value;
        }else{
            return '暂无状态信息'
        }
    }else{
        return '暂无状态信息'
    }

}

// 验证某个内容不能为空
fn.valiText = function(val,text){
    if(val){
        return {code:200}
    }else{
        return {code:400,text:text}
    }
}


// 验证手机号码
fn.valiMobile = function(val){
    if(val){
        var test = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
        var bool = test.test(val)
        if(bool){
            return {code:200}
        }else{
            return {code:400,text:'手机号码格式错误'}
        }
    }else{
        return {code:400,text:'手机号码不能为空'}
    }
}


//验证身份证号码
fn.valiUserId =  function(val){
    if(val){
        var test = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        var bool = test.test(val);
        if(bool){
            return {code:200}
        }else{
            return {code:400,text:'身份证号码格式错位'}
        }
    }else{
        return {code:400,text:'身份证号码不能为空'}
    }
}

//获取国家数据
fn.countryListData =  function(){
    var data = code;
    var countryList = data.COM_00004
    return countryList
}

//根据国家获取省份
fn.changeCountryByProvince =  function(val){
    var data = code;
    var provinceList = []
    if(val === '156'){
        provinceList = data.COM_00001
    }
    return provinceList
}

//根据省份获取城市
fn.changeProvinceByCity =  function(val){
    var data = code;
    var cityList = []
    for(var i = 0;i < data.COM_00002.length;i++){
        if(data.COM_00002[i].key.slice(0,2) === val.slice(0,2)){
            cityList.push(data.COM_00002[i])
        }
    }
    return cityList
}

//根据城市获取县区
fn.changeCityByArea =  function(val){
    var data = code;
    var areaList = []
    for(var i = 0;i < data.COM_00003.length;i++){
        if(data.COM_00003[i].key.slice(0,4) === val.slice(0,4)){
            areaList.push(data.COM_00003[i])
        }
    }
    return areaList
}

export default fn;

