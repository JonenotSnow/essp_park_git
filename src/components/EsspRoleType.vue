<template>
    <div>
         <img :src="imgUrl"/>
    </div>
</template>

<script>
    export default {
        name: 'EsspRoleType',
        props: {
            rqmRole: {
                type: String,
                required: true
            }
        },
        components: {},
        data() {
            return {
                codeList:[
                    {
                        id:'01',
                        img:require('../assets/imgs/requimgs/provider.png'),
                    },
                    {
                        id:'02',
                        img:require('../assets/imgs/requimgs/demander.png'),
                    },
                    {
                        id:'03',
                        img:require('../assets/imgs/requimgs/buyer.png'),
                    },
                    {
                        id:'04',
                        img:require('../assets/imgs/requimgs/seller.png'),
                    },
                    {
                        id:'05',
                        img:require('../assets/imgs/requimgs/society.png'),
                    },{
                        id:'06',
                        img:require('../assets/imgs/requimgs/govern.png'),
                    },
                    {
                        id:'07',
                        img:require('../assets/imgs/requimgs/tenant.png'),
                    },
                    {
                        id:'08',
                        img:require('../assets/imgs/requimgs/rent.png'),
                    },
                    {
                        id:'09',
                        img:require('../assets/imgs/requimgs/financing.png'),
                    },
                    {
                        id:'10',
                        img:require('../assets/imgs/requimgs/investor.png'),
                    },
                    {
                        id:'11',
                        img:require('../assets/imgs/requimgs/financing.png'),
                    },
                    {
                        id:'12',
                        img:require('../assets/imgs/requimgs/investor.png'),
                    },
                    {
                        id:'13',
                        img:require('../assets/imgs/requimgs/energy_serve.png'),
                    },
                    {
                        id:'14',
                        img:require('../assets/imgs/requimgs/energy_use.png'),
                    },
                    {
                        id:'15',
                        img:require('../assets/imgs/requimgs/recommend.png'),
                    },
                    {
                        id:'16',
                        img:require('../assets/imgs/requimgs/investor.png'),
                    },
                    {
                        id:'17',
                        img:require('../assets/imgs/requimgs/demand.png'),
                    },
                    {
                        id:'18',
                        img:require('../assets/imgs/requimgs/provide.png'),
                    },
                    {
                        id:'19',
                        img:require('../assets/imgs/requimgs/buyer.png'),
                    },
                    {
                        id:'20',
                        img:require('../assets/imgs/requimgs/seller.png'),
                    },
                ],
                imgUrl:''
            }
        },
        created(){
            let role = this.codeList.find(e => e.id == this.rqmRole);
            if(role)
            {
                this.imgUrl = role['img'];
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
