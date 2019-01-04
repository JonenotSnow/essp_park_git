//聊天文档

//聊天工具入口 App.vue

//聊天工具接口 /fetch/api/chat

//聊天状态管理器目录 /store/modules/chat.js

//聊天组件目录 /components/chat
addfriends -addFriend 群聊添加删除人员组件
           -groupMembers  @群成员列表
bigImg -bigImg 聊天图片放大
chatDetail -chatDetail 详情页
chatlist -chatlist 最近聊天列表
consult -consult 咨询详情页
consultList -consultList 咨询列表
friendlist -friendlist 好友列表
info -info 好友详情页
message -message 聊天信息列表
mycard -mycard 侧边栏按钮
newchats -newchats 群列表
newfriend -newfriend 好友添加列表 好友搜索列表
search -search 搜索框组件
text -text 聊天输入框
chatIndex -chatIndex 聊天工具组合

//消息发送格式
let msg = {
    "senderId": '发送人id',
    "recipientId":  '接收人id',
    "sender":  '发送人登录名',
    "recipient":  '接收人登录名',
    "msgType": 'text', //(文本:text,图片:image)
    "content": "内容",
    "senderName": '发送人名字',
    "photoUrl": "发送人头像",
    "type": "类型", //(群聊:group,私聊:friend,咨询:consult，通知：notice,心跳：heart;消息已读：updateChatRecordStatus)
    "chatType":  '类型',（群聊:group,私聊:friend,咨询:consult）只有当type为updateChatRecordStatus有效
    "groupId":  '群id',
    "action":  '动作',单发 single，群发 otherGroupMember
};

//notice 通知类型 发送的时候放在content之中做判断
friendAgree 同意添加好友
friendAgreeNo 拒绝添加好友
remind @好友提醒todo
groupAddMembers 添加群成员
friendDel 好友删除
consultAgree 同意咨询
friendRequest 好友申请
consultRequest 发送咨询申请
consultDel 结束咨询
consultAgreeNo 拒绝咨询
groupAdd 创建群聊
groupDel 删除群聊删除对应群聊信息
groupMemberDel 删除群成员
groupNameChange 修改群名
nickNameChange 修改群昵称
