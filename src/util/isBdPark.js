const isBdPark = {
    //是否是保定园区
    isBdPark() {
        //暂时依靠两种方案判断，（parkname 有保定 ，或者登陆带了 bdFlag 任意一个都算保定园区）
        var isParkNameHasBd = false;
        let bdParkId = sessionStorage.getItem("bdParkId")
        let bdFlag =  bdParkId && bdParkId.indexOf('bd')>-1
        let parkName = sessionStorage.getItem("parkName")
        if (parkName) {
            var falg = parkName.indexOf("保定") > -1;
            isParkNameHasBd = falg;
        }
        return isParkNameHasBd || bdFlag;
    }
    
}

export default isBdPark