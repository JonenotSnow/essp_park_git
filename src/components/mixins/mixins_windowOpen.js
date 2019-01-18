export default {
    data() {
        return {
            mixin_window_parkId:'',
            mixin_window_label:'',
            mixin_window_token:''
        };
    },
    methods: {
        //新开标签打开url，参数可放url，可放参数，方法里面统一带token
        windowOpenUrl(url, params) {
            this.getCurrentParams()
            params+='&'+this.mixin_window_token
            params = params.replace(/\?\&+/, "?");
           window.open(this.$openUrl + url + params);
        },
        //新开标签打开url，不带参数，方法里面统一带token
        windowOpenNoParams(url){
            this.getCurrentParams()
            let params = "?" + this.mixin_window_token;
            window.open(this.$openUrl + url + params);
        },
        // 直接放url，大多用于登陆
        windowHrefUrl(url) {
            // 判断 session里有没有bd，否则从url中选择
            this.getCurrentParams()
            let params = "?" + this.mixin_window_token + "&" + this.mixin_window_parkId+'&channel=PARK' + "&returnUrl=";
            params = params.replace(/\?\&+/, "?");
            let parkLabel =
                location.href.indexOf("?") > -1 && this.mixin_window_label
                    ? "&" + this.mixin_window_label
                    : "?" + this.mixin_window_label;
            let hasLabel = location.href.indexOf('label=')>-1
            hasLabel=!hasLabel?parkLabel:''
            hasLabel=location.href+hasLabel
            window.location.href =
                this.$openUrl +
                url +
                params +
                encodeURIComponent(hasLabel);
        },
        // 用于当前页面平台跳转，不做return 园区操作。
        windowHrefUrlNormal(url) {
            // 正常跳转，不需要returnUlr但是需要带token和parkId
            this.getCurrentParams()
            let params = "?" + this.mixin_window_token;
            params = params.replace(/\?\&+/, "?");
            // let parkLabel = '&label='+label
            window.location.href = this.$openUrl + url + params;
        },
        // 更新参数，每次获取相对应的参数信息
        getCurrentParams(){
            let parkId = this.SSH.getItem("parkId");
            this.mixin_window_parkId = parkId ? "parkId=" + parkId : "";
            let bdParkId = this.SSH.getItem("bdParkId");
            let label =
                location.origin.indexOf("bdppc") > -1 ? "bdPark2018" : bdParkId;
            this.mixin_window_label = label ? "label=" + label : "";
            this.mixin_window_token = this.SSH.getItem("token") ? "token=" + this.SSH.getItem("token") : "";

        }
    }
};
