export default {
    data() {
        return {
            parkId:'',
            label:'',
            token:''
        };
    },
    methods: {
        windowOpenUrl(url, params) {
           window.open(this.$openUrl + url + params);
        },
        windowOpenNoParams(url){
            this.getCurrentParams()
            let params = "?" + this.token;
            window.open(this.$openUrl + url + params);
        },
        windowHrefUrl(url) {
            // 判断 session里有没有bdparkId，否则从url中选择
            this.getCurrentParams()
            let params = "?" + this.token + "&" + this.parkId+'&channel=PARK' + "&returnUrl=";
            params = params.replace(/\?\&+/, "?");
            let parkLabel =
                location.href.indexOf("?") > -1 && this.label
                    ? "&" + this.label
                    : "?" + this.label;
            window.location.href =
                this.$openUrl +
                url +
                params +
                encodeURIComponent(location.href + parkLabel);
        },
        windowHrefUrlNormal(url) {
            // 正常跳转，不需要returnUlr但是需要带token和parkId
            this.getCurrentParams()
            let params = "?" + this.token;
            params = params.replace(/\?\&+/, "?");
            // let parkLabel = '&label='+label
            window.location.href = this.$openUrl + url + params;
        },
        getCurrentParams(){
            let parkId = this.SSH.getItem("parkId");
            this.parkId = parkId ? "parkId=" + parkId : "";
            let bdParkId = this.SSH.getItem("bdParkId");
            let label =
                location.origin.indexOf("bdppc") > -1 ? "bdppc" : bdParkId;
            this.label = label ? "label=" + label : "";
            this.token = this.SSH.getItem("token") ? "token=" + this.SSH.getItem("token") : "";

        }
    }
};
