<!-- 文本输入框 -->
<template>
    <div class="text">
        <div class="emoji">
            <img v-if="chat.selectId" width="18" height="18"
                 src="../../../assets/chat-icon/face.png"
                 @click="chat.showEmoji=!chat.showEmoji">
            <el-upload action="uploadAction"
                       class="upload-demo-chat"
                       :before-upload="before_upload"
                       :http-request="upload_file"
                       :file-list="fileList"
                       ref="upload">
                <div slot="trigger" v-if="chat.selectId">
                    <img v-if="chat.selectId" style="margin-left: 10px" width="18" height="18"
                         src="../../../assets/chat-icon/send-img.png" @click="chat.showEmoji=false">
                </div>
            </el-upload>
            <transition name="showbox">
                <div class="emojiBox" v-show="chat.showEmoji">
                    <li v-for="(item, index) in chat.emojis" :key="index">
                        <!--<img :src="'static/emoji/'+item.file" :data="item.code" @click="content +=item.code">-->
                        <img :src="'static/emoji/'+item.file" :data="item.code" @click="addEmoji(item)">
                    </li>
                </div>
            </transition>
        </div>
        <div class="chat-text" @keyup.ctrl.enter="send('enter')">
            <quill-editor v-if="chat.selectId"
                          ref="childEditor"  v-model="editorCon" @focus="onEditorFocus($event)"
                          @blur="onEditorBlur($event)" @change="changeText($event)">
            </quill-editor>
        </div>

        <div v-if="chat.chatType==='consult'" class="closeSend" @click="closeSend">
            <span>结束咨询</span>
        </div>
        <el-tooltip class="item" effect="dark" content="ctrl+enter发送消息" placement="top">
            <div v-if="selectedChat" class="send" @click="send('click')">
                <span>发送</span>
            </div>
        </el-tooltip>
        <transition name="appear">
            <div class="warn" v-show="warn">
                <div class="description">不能发送空白信息</div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    // import textEditor from '../text/textEditor'
    // import textEditorTwo from '../text/textEditorTwo'
    import groupMembers from '../addfriends/groupMembers'
    import bus from '../../../eventBus'

    export default {
        components: {
            // textEditor,
            // esspDitor,
            // textEditorTwo,
            groupMembers
        },
        data() {
            return {
                //展示内容
                content: '',
                value: '',
                isLocked: false,
                imageUrl: '',
                reply: '未找到',
                frequency: 0,
                warn: false,
                type: 'friend',
                // -图片相关
                uploadAction: '',
                fileList: [],
                formData: '',
                editorCon: "",
                editorOption: {
                    editorCon: '',
                    readOnly: 'true',
                    placeholder: `请输入内容`,
                    modules: {}
                },
                selectMembers: [],
            };
        },
        computed: {
            ...mapState([
                'chat',
            ]),
            ...mapGetters([
                'selectedChat',
            ])
        },
        methods: {
            onEditorFocus(e) {
                this.$store.state.chat.showEmoji = false
            },
            onEditorBlur(e) {

            },
            addMember(val) {
                this.$store.state.chat.showGroupMembers = false;
                this.keepIndex(val.trueName + " ", '@');
            },
            changeText(e) {
                this.$store.state.chat.showEmoji = false
                let quill = this.$refs.childEditor.quill
                let index = 0
                if (quill.getSelection())
                    index = quill.getSelection().index
                if (this.editorCon.substring(index + 2, index + 3) == '@') {
                    if (this.$store.state.chat.chatType == 'group') {
                        this.$store.state.chat.showGroupMembers = true;
                    }
                }
            },
            before_upload(file) {
                if (this.$store.state.chat.chatDelFlag == '1') {
                    this.$message.warning('当前群聊已解散,不能发送图片！')
                    return false;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (this.utils.uploadTypecheck(file, '1', this.constants.uploadType.image) === 'error') {
                    this.$message.error('文件名只允许含有一个\'.\'');
                    return
                } else if (!this.utils.uploadTypecheck(file, '1', this.constants.uploadType.image)) {
                    this.$message.error(this.licenseInfor);
                    return false
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                    return isLt2M
                }
            },
            upload_file(file) {
                let vm = this;
                this.utils.photoCompress(file.file, {}, function (theFile) {
                    console.log('压缩后' + theFile.size)
                    vm.formData = new FormData();
                    vm.formData.append('file', theFile, file.file.name);
                    vm.formData.append('model', 'chat');
                    vm.formData.append('type', 'friend'); // -friend group consult
                    vm.$post(vm.$apiUrl.chat.uploadAction, vm.formData).then(response => {
                        let chat = vm.$store.state.chat.chatlist.find(friend => friend.id == vm.$store.state.chat.selectId);
                        let msg = {
                            "senderId": vm.SSH.getItem('userInfo').id + '',
                            "recipientId": vm.$store.state.chat.selectId + '',
                            "sender": vm.SSH.getItem('userInfo').username + '',
                            "recipient": chat.receiver + '',
                            "senderName": vm.SSH.getItem('userInfo').username + '',
                            "photoUrl": vm.SSH.getItem('userInfo').photoUrl,
                            "msgType": 'image', //(文本:text,图片:image)
                            "content": response.resultData[0].url,
                            "type": chat.type //(群聊:group,私聊:friend,咨询:consult)
                        };
                        if (chat.type === 'group') {
                            let sendName = ''
                            if (chat.nickName) {
                                sendName = chat.nickName
                            } else {
                                sendName = this.SSH.getItem('userInfo').truename
                            }
                            msg = {
                                "senderId": vm.SSH.getItem('userInfo').id + '',
                                "recipientId": vm.$store.state.chat.selectId + '',
                                "sender": vm.SSH.getItem('userInfo').username + '',
                                "recipient": vm.$store.state.chat.selectId + '',
                                "msgType": 'image', //(文本:text,图片:image)
                                "senderName": sendName + '',
                                "content": response.resultData[0].url,
                                "photoUrl": vm.SSH.getItem('userInfo').photoUrl,
                                "type": chat.type, //(群聊:group,私聊:friend,咨询:consult)
                                "groupId": vm.$store.state.chat.selectId + '', //(群聊:group,私聊:friend,咨询:consult)
                            };
                        }
                        if (chat.type === 'consult') {
                            if (chat.messages.length < 1) {
                                let notice = {
                                    "senderId": vm.SSH.getItem('userInfo').id + '',
                                    "recipientId": vm.$store.state.chat.selectId + '',
                                    "sender": vm.SSH.getItem('userInfo').username + '',
                                    "recipient": chat.receiver + '',
                                    "msgType": 'text', //(文本:text,图片:image)
                                    "content": 'consultRequest',
                                    "action": 'single',
                                    "senderName": vm.SSH.getItem('userInfo').cstNm,
                                    "photoUrl": vm.SSH.getItem('userInfo').photoUrl,
                                    "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                                };
                                let consult = JSON.stringify(notice);
                                this.$store.dispatch('sendWs', consult);
                            }
                        }
                        let param = JSON.stringify(msg);
                        vm.$store.dispatch('sendWs', param);
                        vm.$store.dispatch('sendMessage', msg);
                    })
                })
            },
            // 添加表情
            addEmoji(emoji) {
                this.$store.state.chat.showEmoji = false;
                let img = 'static/emoji/' + emoji.file
                this.keepIndex(img, 'emoji')
            },
            //根据光标位置添加内容并修改光标位置
            keepIndex(value, type) {
                let quill = this.$refs.childEditor.quill
                let index = 0
                if (quill.getSelection())
                    index = quill.getSelection().index
                if (type == 'emoji') {
                    quill.insertEmbed(index, 'image', value)
                    quill.setSelection(index + 1)
                } else if (type == '@') {
                    index = quill.selection.savedRange.index;
                    quill.insertEmbed(index, 'text', value);
                    quill.setSelection(index + value.length);
                    this.getSelectMembers();
                } else {
                    index = quill.selection.savedRange.index
                    quill.insertEmbed(index, 'text', value)
                    quill.setSelection(index + value.length)
                }
            },
            getSelectMembers() {
                this.selectMembers = [];
                for (let selectMembersListElement of this.$store.state.chat.groupChatMembers) {
                    let temp = "@" + selectMembersListElement.trueName;
                    if (this.editorCon.search(temp) != -1) {
                        this.selectMembers.push(selectMembersListElement);
                    }
                }
            },
            //关闭咨询
            closeSend() {
                let vm = this
                vm.$post(vm.$apiUrl.chat.delFriend, {
                    userid: vm.SSH.getItem('userInfo').id,
                    friendid: vm.$store.state.chat.selectId
                }).then(response => {
                    let chat = this.$store.state.chat.chatlist.find(friend => friend.id == this.$store.state.chat.selectId);
                    let list = []
                    for (let item of vm.$store.state.chat.chatlist) {
                        if (item.id != vm.$store.state.chat.selectId) {
                            list.push(item)
                        }
                    }
                    if (list.length > 0) {
                        vm.$store.state.chat.chatlist = list;
                        vm.SSH.setItem('messageList', list)
                    } else {
                        vm.$store.state.chat.chatlist = [];
                        vm.SSH.setItem('messageList', [])
                    }
                    let msg = {
                        "senderId": vm.SSH.getItem('userInfo').id + '',
                        "recipientId": vm.$store.state.chat.selectId + '',
                        "sender": vm.SSH.getItem('userInfo').username + '',
                        "recipient": chat.receiver + '',
                        "senderName": vm.SSH.getItem('userInfo').cstNm,
                        "photoUrl": vm.SSH.getItem('userInfo').photoUrl,
                        "msgType": 'text', //(文本:text,图片:image)
                        "content": 'consultDel',
                        "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                    };
                    let param = JSON.stringify(msg);
                    vm.$store.dispatch('sendWs', param);
                    vm.$store.state.chat.selectId = '';
                    vm.$store.state.chat.chatType = '';
                    vm.$store.state.chat.selectFriendId = '';
                    vm.$store.state.chat.openChat = false;
                    vm.$store.state.chat.showEmoji = false;
                });
            },

            sendMsg() {
                if (this.$store.state.chat.selectCard === 1) {
                    let chat = this.$store.state.chat.chatlist.find(friend => friend.id == this.$store.state.chat.selectId);
                    let msg = {
                        "senderId": this.SSH.getItem('userInfo').id + '',
                        "recipientId": this.$store.state.chat.selectId + '',
                        "sender": this.SSH.getItem('userInfo').username + '',
                        "recipient": chat.receiver + '',
                        "msgType": 'text', //(文本:text,图片:image)
                        "content": this.editorCon,
                        "senderName": this.SSH.getItem('userInfo').username + '',
                        "photoUrl": this.SSH.getItem('userInfo').photoUrl,
                        "type": chat.type, //(群聊:group,私聊:friend,咨询:consult)
                    };
                    if (chat.type === 'group') {
                        let sendName = ''
                        if (chat.nickName) {
                            sendName = chat.nickName
                        } else {
                            sendName = this.SSH.getItem('userInfo').truename
                        }
                        msg = {
                            "senderId": this.SSH.getItem('userInfo').id + '',
                            "recipientId": this.$store.state.chat.selectId + '',
                            "sender": this.SSH.getItem('userInfo').username + '',
                            "recipient": this.$store.state.chat.selectId + '',
                            "msgType": 'text', //(文本:text,图片:image)
                            "content": this.editorCon,
                            "senderName": sendName + '',
                            "photoUrl": this.SSH.getItem('userInfo').photoUrl,
                            "type": chat.type, //(群聊:group,私聊:friend,咨询:consult)
                            "groupId": this.$store.state.chat.selectId + '', //(群聊:group,私聊:friend,咨询:consult)
                        };
                    }
                    if (chat.type === 'consult') {
                        if (chat.messages.length < 1) {
                            let notice = {
                                "senderId": this.SSH.getItem('userInfo').id + '',
                                "recipientId": this.$store.state.chat.selectId + '',
                                "sender": this.SSH.getItem('userInfo').username + '',
                                "recipient": chat.receiver + '',
                                "msgType": 'text', //(文本:text,图片:image)
                                "content": 'consultRequest',
                                "action": 'single',
                                "senderName": this.SSH.getItem('userInfo').cstNm,
                                "photoUrl": this.SSH.getItem('userInfo').photoUrl,
                                "type": 'notice' //(群聊:group,私聊:friend,咨询:consult)
                            };
                            let consult = JSON.stringify(notice);
                            this.$store.dispatch('sendWs', consult);
                        }
                    }
                    let param = JSON.stringify(msg);
                    this.$store.dispatch('sendWs', param);
                    this.$store.dispatch('sendMessage', msg);
                    //根据最后发送内容是否含有@列表里的人员进行推送
                    for (let selectMembersListElement of this.selectMembers) {
                        let temp = "@" + selectMembersListElement.trueName;
                        if (this.editorCon.search(temp) != -1) {
                            let notice2 = {
                                "senderId": this.SSH.getItem('userInfo').id + '',
                                "recipientId": this.$store.state.chat.selectId + '',
                                "sender": this.SSH.getItem('userInfo').username + '',
                                "recipient": selectMembersListElement.userName + '',
                                "msgType": 'text', //(文本:text,图片:image)
                                "content": 'remind',
                                "action": 'single',
                                "senderName": this.SSH.getItem('userInfo').cstNm,
                                "photoUrl": this.SSH.getItem('userInfo').photoUrl,
                                "type": 'notice',//(群聊:group,私聊:friend,咨询:consult)
                                "groupId": this.$store.state.chat.selectId + '',
                            };
                            let consult2 = JSON.stringify(notice2);
                            this.$store.dispatch('sendWs', consult2);
                        }
                    }
                }
                this.editorCon = '';
                this.selectMembers = [];
                this.$store.state.chat.selectMembersList = [];
            },
            //光标定位到末尾
            keepLastIndex(el) {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                //判断光标位置，如不需要可删除
                if (sel.anchorOffset != 0) {
                    return;
                }
                sel.removeAllRanges();
                sel.addRange(range);
            },
            // 点击发送按钮发送信息
            send(type) {
                if (this.$store.state.chat.chatDelFlag == '1') {
                    this.$message.warning('当前群聊已解散,不能发送消息！')
                    this.editorCon = '';
                    this.$store.state.chat.selectMembersList = [];
                    return;
                } else {
                    if (this.editorCon.length < 1) {
                        this.warn = true
                        setTimeout(() => {
                            this.warn = false;
                        }, 1000)
                    } else {
                        this.sendMsg();
                    }
                }
            },
        },
        //生命周期内销毁防止多次请求
        beforeDestroy() {
            bus.$off('addMembers')
        },
        mounted() {
            let vm = this;
            bus.$on("addMembers", function (val) {
                vm.addMember(val);
            })
        },
        watch: {
            // 在选择其它对话的时候 聚焦输入框
            selectedChat() {
                let vm = this
                setTimeout(() => {
                    vm.$refs.childEditor.quill.setSelection(0)
                    vm.editorCon = ''
                    vm.$store.state.chat.showEmoji = false;
                }, 0)
            },
            // content() {
            //     if (!this.isLocked || !this.value) {
            //         this.content = this.value;
            //     }
            // }
        },
        created() {
            this.uploadAction = this.$apiUrl.chat.uploadActionl
        },
    }
</script>
<style lang="less">
    .upload-demo-chat {
        display: inline-block;
        .el-upload-list {
            display: none;
        }
    }
</style>
<style lang="less">
    .chat-text {
        .ql-toolbar.ql-snow {
            display: none;
        }

        .ql-editor {
            padding: 0 15px;
            height: 85px;
        }

        .ql-container {
            background: #fff;
        }

        .ql-container.ql-snow {
            border: 0;
        }

        .ql-tooltip .ql-hidden {
            display: none;
        }
    }

    .ql-editor::-webkit-scrollbar-track {
        border-radius: 0;
        padding: 0;
        background-color: transparent;
    }

    .ql-editor::-webkit-scrollbar-thumb {
        border-radius: 10px;
        padding: 0;
        background-color: rgba(0, 0, 0, .2);
    }

    .ql-editor::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: transparent;
    }
</style>

<style lang="less" scoped>

    .text {
        position: relative;
        height: 160px;
        background: #fff;
        .emoji {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            padding: 0 30px;
            box-sizing: border-box;
            color: #7c7c7c;
            .icon-look {
                cursor: pointer;
                &:hover {
                    color: #1aad19;
                }
            }
            .emojiBox {
                position: absolute;
                display: flex;
                flex-wrap: wrap;
                top: -210px;
                left: -100px;
                width: 300px;
                height: 200px;
                padding: 5px;
                background-color: #fff;
                border: 1px solid #d1d1d1;
                border-radius: 2px;
                box-shadow: 0 1px 2px 1px #d1d1d1;
                &.showbox-enter-active,
                &.showbox-leave-active {
                    transition: all .5s;
                }
                &.showbox-enter,
                &.showbox-leave-active {
                    opacity: 0;
                }
            }
        }
        textarea {
            box-sizing: border-box;
            padding: 0 30px;
            height: 76px;
            width: 100%;
            border: none;
            outline: none;
            font-family: "Micrsofot Yahei";
            resize: none;
        }
        .send {
            position: absolute;
            bottom: 10px;
            right: 20px;
            width: 70px;
            height: 28px;
            line-height: 26px;
            box-sizing: border-box;
            text-align: center;
            border: 1px solid #e5e5e5;
            background: #f5f5f5;
            font-size: 14px;
            color: #737373;
            cursor: pointer;
            &:hover {
                background: #22a2fa;
                color: #fff;
            }
        }
        .closeSend {
            position: absolute;
            bottom: 10px;
            right: 100px;
            width: 75px;
            height: 28px;
            line-height: 26px;
            box-sizing: border-box;
            text-align: center;
            border: 1px solid #e5e5e5;
            background: #f45454;
            font-size: 14px;
            color: #ffffff;
            cursor: pointer;
            &:hover {
                background: rgb(18, 150, 17);
                color: #fff;
            }
        }
        .warn {
            position: absolute;
            bottom: 50px;
            right: 10px;
            width: 110px;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            text-align: center;
            border: 1px solid #bdbdbd;
            border-radius: 4px;
            box-shadow: 0 1px 5px 1px #bdbdbd;
            &.appear-enter-active,
            &.appear-leave-active {
                transition: all 1s;
            }
            &.appear-enter,
            &.appear-leave-active {
                opacity: 0;
            }
            &:before {
                content: " ";
                position: absolute;
                top: 100%;
                right: 20px;
                border: 7px solid transparent;
                border-top-color: #fff;
                filter: drop-shadow(1px 3px 2px #bdbdbd);
            }
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        width: 10px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .edit-div {
        height: 75px;
        overflow: auto;
        word-break: break-all;
        outline: none;
        padding-left: 25px;
        margin-right: 20px;
        user-select: text;
        white-space: pre-wrap;
        text-align: left;
    }


</style>
