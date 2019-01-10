<template>
<div>
    <div class="applyperson esspclearfix">
        <span class="spanmain">报名人</span>
        <i class="personsanjiao"></i>
    </div>
    <div class="detail esspclearfix">
        <div class="detailitem"><lable class="detaillable">名字 :</lable><em class="detailtxt">张茉茉</em></div>
        <div class="detailitem"><lable class="detaillable">手机 :</lable><em class="detailtxt">13860715115</em></div>
        <div class="detailitem"><lable class="detaillable">性别 :</lable><em class="detailtxt">男</em></div>
        <div class="detailitem"><lable class="detaillable">年龄 :</lable><em class="detailtxt">25</em></div>
        <div class="detailitem"><lable class="detaillable">岗位 :</lable><em class="detailtxt">开发工程师</em></div>
        <div class="detailitem"><lable class="detaillable">部门 :</lable><em class="detailtxt">研发部</em></div>
        <div class="detailitem"><lable class="detaillable">兴趣爱好 :</lable><em class="detailtxt">泡妞</em></div>
        <div class="detailitem"><lable class="detaillable">毕业学校 :</lable><em class="detailtxt">清华大学</em></div>
        <div class="detailitem"><lable class="detaillable">邮箱 :</lable><em class="detailtxt">33445566@qq.com</em></div>
        <div class="detailitem"><lable class="detaillable">地址 :</lable><em class="detailtxt">厦门大学生生世世顶顶顶</em></div>
    </div>
</div>
</template>
<style lang="less" scoped>
@import "../../../assets/css/mixin";
.applyperson{
    margin-bottom: 22px;
    position: relative;
    .spanmain{
        float: left;
        font-size: 18px;
        line-height: 30px;
        padding:0 15px;
        color: #666;
    }
    .personsanjiao{
        .esspsanjiao(bottom,@w:8px,@c:#999);
        position: absolute;
        top:12px;
        &:hover{
            cursor: pointer;
        }
    }

}
// 表单的布局开始
.detail{
    padding: 10px 40px;
    background-color: #ffffff;
	box-shadow: 2px 1px 3px 0px
		rgba(0, 102, 179, 0.15),
		-2px -2px 3px 0px
		rgba(0, 102, 179, 0.15);
}
.detailitem{
    float: left;
    width:50%;
	font-size: 14px;
	font-weight: normal;
    line-height: 30px;


}
.detaillable {
    float: left;
    width:100px;
    color: #666666;
}
.detailtxt{
    float: left;
    color: #333;
}
</style>

