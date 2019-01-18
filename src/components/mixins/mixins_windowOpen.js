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
            let curentObjt = Object.assign({},params,{token:this.mixin_window_token,channel:'PARK'})
            let getUrl = this.utils.setUrlParams(curentObjt,'',this.$openUrl+url)
            window.open(getUrl);
        },
        //新开标签打开url，不带参数，方法里面统一带token
        windowOpenNoParams(url){
            this.getCurrentParams()
            let curentObjt = Object.assign({},{token:this.mixin_window_token})
            let getUrl = this.utils.setUrlParams(curentObjt,'',this.$openUrl+url)
            window.open(getUrl);
        },
        // 直接放url，大多用于登陆
        windowHrefUrl(url) {
            // 判断 session里有没有bd，否则从url中选择
            this.getCurrentParams()

            // 获取当前return路径覆盖label
            let currentObj = {label:this.mixin_window_label}
            let returnUrl = this.utils.setUrlParams(currentObj)
            returnUrl =encodeURIComponent(returnUrl)
            // 登陆参数
            currentObj=Object.assign({},{returnUrl:returnUrl},{token:this.mixin_window_token,channel:'PARK'})
           
            let getUrl = this.utils.setUrlParams(currentObj,'',this.$openUrl+url)
            window.open(getUrl);
        },
        // 用于当前页面平台跳转，不做return 园区操作。
        windowHrefUrlNormal(url) {
            // 正常跳转，不需要returnUlr但是需要带token和parkId
            this.getCurrentParams()
            let curentObjt = Object.assign({},{token:this.mixin_window_token})
            let getUrl = this.utils.setUrlParams(curentObjt,'',this.$openUrl+url)
            window.location.href = getUrl
        },
        // 更新参数，每次获取相对应的参数信息
        getCurrentParams(){
            let parkId = this.SSH.getItem("parkId");
            this.mixin_window_parkId = parkId 
            let bdParkId = this.SSH.getItem("bdParkId");
            let label =
                location.origin.indexOf("bdppc") > -1 ? "bdPark2018" : bdParkId;
            this.mixin_window_label =  label ;
            this.mixin_window_token = this.SSH.getItem("token")
            
        }
    }
};
