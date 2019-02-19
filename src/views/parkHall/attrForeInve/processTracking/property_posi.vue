<template>
    <!--物业位置-->
    <el-dialog
        title="物业位置"
        :visible.sync="isShow"
        class="propery_mask"
        :before-close="handleClose">
        <div class="propery_mask_con">
            <div class="propery_inner">
                <div class="proper_item proper_item1 esspclearfix">
                    <span>已选房间:</span>
                    <div class="proper_item_r">
                        <ol v-for="(item,index) in selectRommObjList" v-if="index<2" :key="index">
                            <li >{{item.blProject}}<i class="el-icon-arrow-right"></i></li>
                            <li>{{item.bname}}<i class="el-icon-arrow-right"></i></li>
                            <li><span>{{item.rname}}</span></li>
                        </ol>
                    </div>

                </div>
                <div class="proper_item proper_item1 esspclearfix">
                    <span>房间状态:</span>
                    <ul>
                        <li v-if="roomStatusList.length > 0" @click="roomStatusTab(item,index)"
                            v-for="(item,index) in roomStatusList" :key="index"
                            :class="index == roomStatusIndex?'sel':''">{{item.name}}
                        </li>
                        <li v-if="roomStatusList.length == 0">暂无房间状态</li>
                    </ul>
                </div>
                <div class="proper_item esspclearfix">
                    <span>物业项目:</span>
                    <ul>
                        <li v-if="projectList.length > 0" @click="projectTab(item,index)"
                            v-for="(item,index) in projectList" :key="index" :class="index == projectIndex?'sel':''">
                            {{item.name}}
                        </li>
                        <li v-if="projectList.length == 0">暂无物业数据！</li>
                    </ul>
                </div>
                <div class="proper_item esspclearfix">
                    <span>楼宇:</span>
                    <ul>
                        <li v-if="buildingList.length > 0" @click="buildingListTab(item,index)"
                            v-for="(item,index) in buildingList" :key="index" :class="index == buildingIndex?'sel':''">
                            {{item.bname}}
                        </li>
                        <li v-if="buildingList.length == 0">暂无楼宇数据！</li>
                    </ul>
                </div>
                <div class="lylist">
                    <div class="no_info_room" v-if="roomIdList.length == 0">{{msg[msgIndex]}}</div>
                    <div class="room_item" v-if="roomIdList.length > 0" v-for="(item,index) in roomIdList" :key="index">
                        <div class="room_item_number">{{item.rno_name}}</div>
                        <div class="room_item_blocks">
                            <ul class="esspclearfix">
                                <li v-if="item.list.length > 0" @click="roomTab(itemChild,indexChild)" v-for="(itemChild,indexChild) in item.list" :key="itemChild"
                                    :class="itemChild.show?'sel':''">{{itemChild.rname || '无'}}
                                </li>
                                <li v-if="item.list.length == 0">无房间号</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="handleClose">取 消</el-button>
            <el-button size="small" type="primary" @click="sureBtn">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        name: "",
        props: ['isShow'],
        data() {
            return {
                projectList: [],            // 项目列表
                projectIndex: 0,            // 项目索引
                buildingList: [],        // 楼宇号列表
                buildingIndex: 0,           // 楼宇索引
                roomIdList: [],             // 房间号列表
                roomIndex: 0,                // 当前选择房间号
                msg: ['没有找到符合条件的房源信息','数据加载中……'], // 提示文案
                msgIndex: 0,
                selectRoomIdList: [],  //
                selectRommObjList:[],
                roomStatusList: [
                    {
                        name: "可租",
                        value: "1"
                    },
                    {
                        name: "已租",
                        value: "2"
                    },
                    {
                        name: "被锁定",
                        value: "3"
                    }
                ],      // 房间状态
                roomStatusIndex: 0,        // 房间状态
                thisRoomStatus: '1',       // 1: 已租

            }
        },
        created() {
            // 初始化项目列表数据
            this.getProjectById();

        },
        methods: {
            // 关闭弹窗
            handleClose() {
                this.$emit("closeMask", false);
            },
            // 点击确认按钮
            sureBtn(){
                if(this.selectRoomIdList.length == 0) {
                    this.$message.error("您还未选择房间！");
                    return;
                }
                this.$emit("sureSelectRoom", this.selectRommObjList);
                this.handleClose();
            },
            // 大小写数组换算
            getCasNum(number) {
                var units = '个十百千万@#%亿^&~';
                var chars = '零一二三四五六七八九';
                /*
                    数字转中文
                    @number {Integer} 形如123的数字
                    @return {String} 返回转换成的形如 一百二十三 的字符串
                */
                var a = (number + '').split(''),
                    s = [];
                    if (a.length > 12) {
                        throw new Error('too big');
                    } else {
                        for (var i = 0, j = a.length - 1; i <= j; i++) {
                            if (j == 1 || j == 5 || j == 9) {//两位数 处理特殊的 1*
                                if (i == 0) {
                                    if (a[i] != '1') s.push(chars.charAt(a[i]));
                                } else {
                                    s.push(chars.charAt(a[i]));
                                }
                            } else {
                                s.push(chars.charAt(a[i]));
                            }
                            if (i != j) {
                                s.push(units.charAt(j - i));
                            }
                        }
                    //return s;
                    return s.join('').replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) {//优先处理 零百 零千 等
                        b = units.indexOf(d);
                        if (b != -1) {
                            if (d == '亿') return d;
                            if (d == '万') return d;
                            if (a[j - b] == '0') return '零'
                        }
                        return '';
                    }).replace(/零+/g, '零').replace(/零([万亿])/g, function (m, b) {// 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
                        return b;
                    }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function (m) {
                        return {'@': '十', '#': '百', '%': '千', '^': '十', '&': '百', '~': '千'}[m];
                    }).replace(/([亿万])([一-九])/g, function (m, d, b, c) {
                        c = units.indexOf(d);
                        if (c != -1) {
                            if (a[j - c] == '0') return d + '零' + b
                        }
                        return m;
                    });
                }
            },
            // 获取项目
            getProjectById() {
                this.$post(this.$apiUrl.processTrack.getProjects, {
                    parkId: sessionStorage.getItem("parkId"),
                    pageSize: 2000
                }).then((response) => {
                    // if (response.resultCode == 'CLT000000000' || response.resultCode == '0000000000') {
                        this.projectList = response.resultData;
                        console.log(this.projectList);
                        if(this.projectList.length != 0) {
                            this.getBuildings();
                        }

                    // } else {
                    //     this.$message.error(response.message)
                    // }
                }, (response) => {
                    this.$message.error(response.message)
                })
            },
            // 获取楼宇
            getBuildings() {
                var id = this.projectList[this.projectIndex].id;
                this.$post(this.$apiUrl.processTrack.getBuildings, {
                    spaceProjectId: id,
                    pageSize: 2000
                }).then((response) => {
                    // if (response.resultCode == 'CLT000000000' || response.resultCode == '0000000000') {
                        this.buildingList = response.resultData.list;
                        this.getRooms();

                    // } else {
                    //     this.$message.error(response.message)
                    // }
                }, (response) => {
                    this.$message.error(response.message)
                })
            },
            // 获取房间
            getRooms() {
                this.msgIndex = 1;
                if(this.buildingList.length == 0){
                    this.msgIndex = 0;
                    return;
                }
                var id = this.buildingList[this.buildingIndex].id;
                this.$post(this.$apiUrl.processTrack.getRooms, {
                    buildingId: id,
                    pageSize: 2000
                }).then((response) => {
                    // if (response.resultCode == 'CLT000000000' || response.resultCode == '0000000000') {
                        var list = response.resultData.list;
                        var roomMaxNumData = this.getMaxFloorNumData(list);
                        console.log(roomMaxNumData)
                        if (roomMaxNumData.num != 0) {
                            for (let i = 0; i < roomMaxNumData.num; i++) {
                                var arr = [];
                                list.forEach((item, index) => {
                                    if (i == item.rno - 1) {
                                        arr.push(item);
                                    }
                                    this.$set(item,"show",false);
                                })
                                this.roomIdList.push({
                                    rno: (i + 1),
                                    list: arr,
                                    rno_name: this.getCasNum(i + 1)+'层'
                                });

                            }
                            if(list.length == 0){
                                this.msgIndex = 0;
                            }
                            this.showRoomSel();

                            console.log(this.roomIdList);
                        }
                    // } else {
                    //     this.$message.error(response.message)
                    // }
                }, (response) => {
                    this.$message.error(response.message)
                })
            },
            // 获取房间号列表最高层数
            getMaxFloorNumData(lists) {
                var num = 0;
                var arr = [];
                if (lists.length == 0) {
                    return 0;
                }
                lists.forEach((item, index) => {
                    if (index == 0) {
                        num = item.rno;
                    } else {
                        if (!item.rno) {
                            return;
                        }
                        if (item.rno >= num) {
                            num = item.rno;
                        }
                    }
                    if (item.rno) {
                        arr.push(item.rno);
                    }

                })
                return {
                    num: Math.max.apply(Math,arr)
                };
            },
            // 项目切换
            projectTab(item, index) {
                this.projectIndex = index;
                var id = this.projectList[this.projectIndex].id;
                this.roomIdList = [];
                this.getBuildings();
            },
            // 楼宇号切换
            buildingListTab(item, index) {
                this.buildingIndex = index;
                this.roomIdList = [];
                this.getRooms();
            },
            // 反选已勾选房间
            showRoomSel(){
                this.roomIdList.forEach((item,index) =>{
                    item.list.forEach((itemChild,indexChild) => {
                        this.selectRoomIdList.forEach((it,ind)=>{
                            if(itemChild.id == it) {
                                itemChild.show = true;
                            }
                        })
                    })
                })
            },
            // 获取已选房间
            getSelectRoom(){
                this.roomIdList.forEach((item,index) =>{
                    item.list.forEach((itemChild,indexChild) => {
                        if(itemChild.show) {
                            this.selectRoomIdList.push(itemChild.id);
                            this.selectRoomIdList = new Set(this.selectRoomIdList);
                            this.selectRoomIdList = [...this.selectRoomIdList];

                            this.selectRommObjList.push(itemChild);
                            this.selectRommObjList = new Set(this.selectRommObjList);
                            this.selectRommObjList = [...this.selectRommObjList];
                        }
                    })
                })


                console.log( this.selectRommObjList);
            },
            // 房间号切换
            roomTab(item, index) {
                this.roomIndex = index;
                item.show = !item.show;
                // 需要判断一下，当前点击的是添加还是减少 ，添加则调用方法，减少则将数组的值减少一个
                if(item.show) {
                    this.getSelectRoom();
                } else {
                    this.selectRoomIdList.forEach((it,ind) => {
                        if(item.id == it) {
                            console.log(item.id,it,ind);
                            this.selectRoomIdList.splice(ind,1)
                        }
                    })
                    this.selectRommObjList.forEach((it,ind) =>{
                        if(item.id == it.id) {
                            console.log(item.id,it,ind);
                            this.selectRommObjList.splice(ind,1)
                        }
                    })
                }

                console.log(this.selectRoomIdList);
            },

            // 房间状态切换
            roomStatusTab(item, index) {
                this.roomStatusIndex = index;
            },
        }
    }
</script>
<style>
    .propery_mask .el-dialog {
        margin: 5% auto 0 !important;
        width: 80%;
        height: 80%;
    }

    .propery_mask .el-dialog__body {
        overflow: hidden;
        height: 72.5%;
        padding: 15px !important;
        background: #f6f8f9;
    }

    .propery_mask .el-dialog__body .propery_mask_con {
        height: 92.5%;
        padding: 15px;
        background: #fff;
    }

    .propery_mask .el-dialog__body .propery_inner {
        height: 100%;
        overflow: auto;
    }

    .propery_inner h3 {
        padding-bottom: 10px;
    }

    .propery_mask .proper_item {
        padding: 5px 0;
    }
    .propery_mask .proper_item span, .propery_mask .proper_item ul, .propery_mask .proper_item ul li {
        float: left;
    }

    .propery_mask .proper_item span, .propery_mask .proper_item ul li {
        height: 25px;
        line-height: 25px;
        margin-bottom: 6px;
    }

    .propery_mask .proper_item span {
        margin-right: 10px;
        font-weight: bold;
    }

    .propery_mask .proper_item ul li {
        padding: 0 10px;
        cursor: pointer;

    }

    .propery_mask .proper_item ul li.sel {
        background: #66b1ff;
        color: #fff;
    }
    .proper_item ol {
        float: left;
        width: 100%;
    }
    .proper_item_r {
        float: left;
    }
    .proper_item ol li {
        float: left;
        line-height: 25px;
    }
    .proper_item ol li span {
        padding: 0 10px;
        background: #66b1ff;
        color: #fff;
        margin-right: 5px;
    }
    .propery_mask .proper_item1 {
        border-top: 1px solid #ccc;
        padding-top: 10px;
    }

    .propery_mask .room_item {
        display: table;
        width: 100%;
        margin-top: 10px;
    }

    .propery_mask .room_item_number {
        display: table-cell;
        vertical-align: middle;
        width: 60px;
        text-align: center;
        border: 1px solid #f7f8f9;
    }

    .propery_mask .room_item_blocks {
        display: table-cell;
        border: 1px solid transparent;
        border-left: 0;
        background: #f5f5f5;
        padding: 5px;
    }

    .propery_mask .room_item_blocks li {
        float: left;
        padding: 2px 10px;
        text-align: center;
        min-width: 60px;
        line-height: 20px;
        background: #fff;
        margin-right: 6px;
        cursor: pointer;
        border: 1px solid #f5f5f5;
    }

    .propery_mask .room_item_blocks li.sel {
        border: 1px solid #ff871c;
        color: #ff871c;
    }

    .propery_mask .no_info_room {
        padding: 10px;
        text-align: center;
    }
</style>
