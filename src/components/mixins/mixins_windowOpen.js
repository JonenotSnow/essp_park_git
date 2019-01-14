export default{
    data:()=>({
        parkId:sessionStorage.getItem('parkId'),
        token:sessionStorage.getItem("token"),

    }),
    methods: {
        windowOpenUrl(url){
            // let params = `?token=${this.token}&parkId=${this.parkId}&channel=Park&returnUrl=`
            window.open(this.$openUrl+url)
        },
        windowHrefUrl(url){
            // 判断 session里有没有bdparkId，否则从url中选择
            let label=sessionStorage.getItem('bdParkId') === 'bdPark2018'|| location.origin.indexOf('bdppc')>-1?'bdppc':'essp_park'
            let params = `?token=${this.token}&parkId=${this.parkId}&channel=PARK&returnUrl=`
            let parkLabel = location.href.indexOf('?')>-1?'&label='+label:'?label='+label
            window.location.href=this.$openUrl+url+params+encodeURIComponent(location.href+parkLabel)
        },
        windowHrefUrlNormal(url){
            // 判断 session里有没有bdparkId，否则从url中选择
            // let label=sessionStorage.getItem('bdParkId') === 'bdPark2018'|| location.origin.indexOf('bdppc')>-1?'bdppc':'essp_park'
            let params = `?token=${this.token}&parkId=${this.parkId}&channel=PARK`
            // let parkLabel = '&label='+label
            window.location.href=this.$openUrl+url+params
        }
    },

}