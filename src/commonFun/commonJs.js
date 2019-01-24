/*
 * 功能： 公共的方法抽离     tipOffMask: 举报方法
 * 调用方式：  this.$commonJs.tipOffMask(param,callBack);  必传 ：informType  byInformer  informerEng entId
 * @callBack: function(){}  回调方法
 * @param : {
 *     informContent:   举报标题（必填）
 *     informType:      类型（必填）  // 3. 资讯模块  4. 活动模块  5. 评论模块
 *     informReason:    举报原因  1. 虚假信息（必填）
 *     byInformer:      被举报人（必填）
 *     informerEng:     被举报人所在企业（必填）
 *     entId:           实体编号  类似id比如 活动id， 评论id等（必填）
 *     informExplain:   举报说明
 * }
 */
import { Message,MessageBox } from 'element-ui';
import {post, get, patch, put, del} from '../fetch/http'
var isTipOffClick = true;
var retrunTipOffReason = function(type){
    // 举报原因汇总
    // 1. 虚假信息  2. 有害信息  3. 违法信息  4.色情淫秽
    // 5. 其他  6. 需求过去  7. 涉嫌抄袭  8. 人身攻击
    // 举报类型: 1. 需求模块 2. 服务模块  3. 资讯模块  4. 活动模块  5. 评论模块
    var allReasonArr = [
        {
            id: 1,
            name: '虚假信息'
        }, {
            id: 2,
            name: '有害信息'
        },{
            id: 3,
            name: '违法信息'
        },{
            id: 4,
            name: '色情淫秽'
        },{
            id: 5,
            name: '其他'
        },{
            id: 6,
            name: '需求过去'
        },{
            id: 7,
            name: '涉嫌抄袭'
        },{
            id: 8,
            name: '人身攻击'
        }
    ]
    var obj = [
        {
            type: 3,    // 资讯模块
            reasonStr: '1,2,3,4,7,5'
        },
        {
            type: 4,    // 活动模块
            reasonStr: '1,2,3,4,5'
        },
        {
            type: 5,    // 评论模块
            reasonStr: '1,2,3,4,8,5'
        }
    ];
    var arr = [];
    var num = 0;
    for(var i = 0; i < obj.length; i++ ) {
        var objType = obj[i].type;
        if(objType == type) {
            var reasonStr = obj[i].reasonStr.split(",");
            reasonStr.forEach((item,index) => {
                allReasonArr.forEach((childItem,childIndex)=>{
                    if(item == childItem.id) {
                        arr.push(childItem)
                    }
                })
            })
            return arr;
        } else {
            num ++;
        }
    }
    return obj;

}

export default  {
    tipOffMaskSubmit : function(param,done){
        var param = param;
        console.log(param);
        if(param == undefined) {
            Message.error("举报参数必传！");
            return;
        }
        if(typeof param != "object") {
            Message.error("举报参数不为对象！");
            return;
        }

        if(param.informContent == undefined || param.informContent == "") {
            Message.error("举报内容必传并且不能为空！");
            return;
        }

        if(param.informReason == undefined || param.informReason == "") {
            Message.error("举报原因必传并且不能为空！");
            return;
        }
        if(param.byInformer == undefined || param.byInformer == "") {
            Message.error("被举报人必传并且不能为空！");
            return;
        }
        if(param.informerEnt == undefined || param.informerEnt == "") {
            Message.error("举报所在企业必传并且不能为空！");
            return;
        }
        if(param.informExplain == undefined || param.informExplain == "") {
            Message.error("举报说明不能为空！");
            return;
        }

        post("/inform/insertInform", param).then(response => {
            console.log(response);
            done();
            if(response.resultCode == "CLT000000000") {
                Message.success(response.resultMsg);
            } else {
                Message.error(response.resultMsg);
            }
            isTipOffClick = true;
        }, (err) => {
            isTipOffClick = true;
            this.$message.error(err.resultMsg);
        });
    },
    tipOffMask: function(param){
        var param  = param;
        if(param.informType == undefined || param.informType == "") {
            Message.error("举报类型必传并且不能为空！");
            return;
        }
        var reasonArr = retrunTipOffReason(param.informType);
        var str = '';

        for(var e = 0; e < reasonArr.length; e++) {
            str += `<li onclick="if(this.className==''){this.className='sel'}else{this.className=''}" attrId="`+reasonArr[e].id+`">`+reasonArr[e].name+`</li>`;
        }

        console.log("举报原因",reasonArr);

        var html = `
           <div class="tip_off_mask" id="tipOffMaskSubmit">
               <div class="tip_off_mask_head">
                    <strong>用户举报</strong>
                    <span>提示：您的个人信息将会严格保密，请放心举报</span>
               </div>
               <div class="tip_off_mask_body">
                    <h3>请选择举报原因（多选）:</h3>
                    <ul class="esspclearfix" id="reasonList"> `+
                        str
                     +
                    `</ul>
                    <h3>请描述举报说明:</h3>
                    <textarea id="textareaVal" placeholder="请尽可能详细描述举报原因，以便帮助平台快速处理"></textarea>
                </div>
                <!--<div class="tip_off_mask_footer">-->
                    <!--<div class="tip_off_mask_submit">提交</div>-->
                <!--</div>-->
            </div>`;
        MessageBox.confirm(html, {
            showConfirmButton:true,
            showCancelButton: false,
            confirmButtonText:"提交",
            customClass:'tip_off_mask_wrap',
            dangerouslyUseHTMLString: true,
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    var textareaVal = document.getElementById("textareaVal").value;
                    var reasonList =  document.getElementById("reasonList").children;
                    var ids = [];
                    for(var i = 0; i < reasonList.length; i++) {
                        if(reasonList[i].className == "sel") {
                            ids.push(reasonList[i].getAttribute("attrId"));
                        }
                    }
                    console.log(ids);
                    if(ids.length == 0) {
                        Message.error("举报原因必选！");
                        isTipOffClick = true;
                        return;
                    }
                    ids = ids.join(",");
                    param.informExplain = textareaVal;
                    param.informReason = ids;

                    console.log(param);
                    if(!isTipOffClick) {
                        return;
                    }
                    isTipOffClick = false;
                    console.log(isTipOffClick);
                    this.tipOffMaskSubmit(param,done);
                } else {
                    done();
                    isTipOffClick = true;
                }
            }
        }).then(action => {
            console.log(action);
            isTipOffClick = true;
        });
    }
}
