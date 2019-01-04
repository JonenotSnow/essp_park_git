export const chat = {
    searchFriend: "/contact/getContact",//搜索好友
    requestAddFriend: "/contact/requestAddFriend",//发起好友添加请求
    getFriendsList: "/contact/getFriendList",//获取已添加的好友列表、待添加的好友列表
    getChatHistory: "/contact/getHistoryList",//获取私聊历史记录

    getGroupChatHistory: "/group/getGroupHistoryList",//获取群聊历史记录

    getGroupMemberList: "/group/getGroupMemberList",//获取群成员列表
    getMemberInfos: "/contact/getMemberInfos",//获取用户信息--获取群成员信息
    agreeAddFriend: "/contact/agreeAddFriend",//同意好友添加
    getGroupList: "/group/getGroupList",//获取群列表

    addGroup: "/group/addGroup",//创建群组
    // sendJoinGroupRequest: "/group/sendJoinGroupRequest",//发起加群请求
    agreeGroupRequest: "/group/agreeGroupRequest",//同意加群
    delFriend: "/contact/delFriend",//删除好友

    beAgreedJoinGroupList: "/group/beAgreedJoinGroupList",//待确认加群信息列表
    getConsultHistoryList: "/contact/getConsultHistoryList",//咨询信息列表
    delGroupMember: "/group/delGroupMember",//删除群成员
    getRecentChats: "/contact/getRecentChats",//最近聊天列表
    getRelationship: "/contact/getRelationship",//获取咨询人与被咨询人的关系
    deleteHistoryList: "/contact/deleteHistoryList",//删除历史记录

    // uploadAction: '/file/saveAccessory', //上传图片
    uploadAction: '/chatSaveAccessory', //上传图片

    delGroup: '/group/delGroup', //删除群
    modifyGroup: '/group/modifyGroup', //修改群名称
    createGroup: '/group/createGroup', //创建群并创建群成员
    sendJoinGroupRequest: '/group/sendJoinGroupRequest', //群拉人

    modifyGroupNickname: '/group/modifyGroupNickname', //修改群昵称
    getGroupInfoById: '/group/getGroupInfoById', //根据群ID获取群信息
    waitJoinGroupMembers: '/group/waitJoinGroupMembers', //获取未加入群的好友列表
    updateChatRecordStatus: '/contact/updateChatRecordStatus', //更新聊天记录状态
}
