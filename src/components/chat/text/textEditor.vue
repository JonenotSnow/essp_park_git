<template>
    <div class="edit-div"
         v-html="innerText"
         ref="text"
         contenteditable="true"
         @focus="isLocked = true"
         @keyup.ctrl.enter="send('enter')"
         @click="closeEmoji"
         @blur="isLocked = false"
         @input="changeText">
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'

    export default {
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        computed: {
            ...mapState([
                'chat',
            ]),
            ...mapGetters([
                'selectedChat',
            ])
        },
        mounted() {
            this.$refs.text.focus()
        },
        data() {
            return {
                innerText: this.value,
                isLocked: false
            }
        },
        watch: {
            'value'() {
                if (!this.isLocked || !this.innerText) {
                    this.innerText = this.value;
                }
            },
            selectedChat() {
                let vm = this
                setTimeout(() => {
                    vm.$refs.text.focus();
                    vm.$store.state.chat.showEmoji = false;
                    vm.$emit('input', '');
                }, 0)
            },
        },
        methods: {
            changeText() {
                this.$emit('input', this.$el.innerHTML);
            },
            closeEmoji() {
                this.$store.state.chat.showEmoji = false;
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
                        "content": this.$el.innerHTML,
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
                            "content": this.$el.innerHTML,
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
                                "senderName": this.SSH.getItem('userInfo').truename + '',
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
                }
                this.$el.innerHTML = ''
            },

            // 点击发送按钮发送信息
            send(type) {
                if (this.$el.innerHTML.length < 1) {
                    this.warn = true
                    this.$el.innerHTML = ''
                    setTimeout(() => {
                        this.warn = false;
                    }, 1000)
                } else {
                    this.sendMsg();
                }
            },
        } 
    }
</script>
<style lang="less" scoped>
    .edit-div {
        width: 100%;
        height: 100%;
        overflow: auto;
        word-break: break-all;
        outline: none;
        padding-left: 25px;
        user-select: text;
        white-space: pre-wrap;
        text-align: left;
        &[contenteditable=true] {
            user-modify: read-write-plaintext-only;
            &:empty:before {
                content: attr(placeholder);
                display: block;
                color: #ccc;
            }
        }
    }
</style>
