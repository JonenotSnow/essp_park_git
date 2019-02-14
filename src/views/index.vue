<template>
    <div class="home">
        <!--<essp-head :routerTypeNum=0-->
        <!--@getValue="setSendTo"></essp-head>-->
        <!--banner闁劌鍨�-->
        <div class="banner">
            <div class="banner-img">
                <el-carousel :interval="5000">
                    <el-carousel-item v-for="(item,index) in sliders"
                                      :key="index">
                        <div class="bgImg "
                             :class="{'pointer':item.advUrl}"
                             @click="special(item.advUrl)"
                             v-bind:style="[{background:bgc +' url('+item.picImg+') '+ rep}]"></div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="banner-pagination">
                <div class="pag-content auto">
                    <el-form ref="form"
                             :model="form"
                             label-width="80px"
                             class="searchForm">
                        <el-row :gutter="35">
                            <el-col :span="6">
                                <div class="txt">
                                    <p class="txt-1">閺呴缚鍏橀崠褰掑帳闂団偓濮癸拷</p>
                                    <p class="txt-2">缁涙盯鈧顑侀崥鍫熸蒋娴犲墎娈戦柅澶愩€嶉敍灞芥彥闁喐鎮崇槐銏ゆ付濮癸拷</p>
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="閹绢喖鎮庣猾璇茬€�">
                                    <el-select v-model="searchForm.serviecTpCd"
                                               placeholder="鐠囩兘鈧瀚�">
                                        <el-option v-for="item in serviecTpCdData"
                                                   :key="item.codeKey"
                                                   :label='item.codeName'
                                                   :value="item.codeKey"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="闂団偓濮瑰倻琚崹锟�">
                                    <el-cascader :options="rqmTpCdData"
                                                 :show-all-levels="false"
                                                 :props="rqmTpCdProps"
                                                 v-model="searchForm.rqmTpCd"
                                                 filterable
                                                 change-on-select></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="闂団偓濮瑰倽顫楅懝锟�">
                                    <el-select v-model="searchForm.rqmRole"
                                               placeholder="鐠囩兘鈧瀚�"
                                               no-data-text="鐠囧嘲鍘涢柅澶嬪閹绢喖鎮庣猾璇茬€烽崪宀勬付濮瑰倻琚崹锟�">
                                        <el-option v-for="item in rqmRoleData"
                                                   :key="item.codeKey"
                                                   :label="item.codeName"
                                                   :value="item.codeKey">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="primary"
                                           @click="goToRqmList()">缁斿宓嗛幖婊呭偍
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </div>
        <!--娴犲绮涢柈銊ュ瀻 -->
        <div class="intro">
            <div class="intro-pagination auto">
                <div class="intro-title-box">
                    <div class="title">閺呴缚鍏橀幘顔兼値閿涘瞼鎮ｉ崥鍫熸箛閸旓拷</div>
                    <div class="title-des">閹垫捇鈧姳绗撶仦鐐扮艾閹劎娈戞稉鈧粩娆忕础閺呴缚鍏橀幘顔兼値閺堝秴濮熼弬瑙勵攳</div>
                </div>
                <div class="intro-content">
                    <ul class="esspclearfix">
                        <li>
                            <a>
                                <div class="li-img">
                                    <img src="../assets/imgs/home/xqfb.png"/>
                                </div>
                                <div class="li-ch-title">闂団偓濮瑰倸褰傜敮锟�</div>
                                <div class="li-sub-title">
                                    <div class="sub">闂団偓濮瑰倸鎻╅柅鐔峰絺鐢拷</div>
                                    <div class="sub">鏉╃偞甯存笟娑㈡付娑撱倖鏌�</div>
                                </div>
                                <!--								<div class="li-bot-title">more</div>
                -->
                            </a>
                        </li>
                        <li>
                            <a>
                                <div class="li-img">
                                    <img src="../assets/imgs/home/znch.png"/>
                                </div>
                                <div class="li-ch-title">閺呴缚鍏橀幘顔兼値</div>
                                <div class="li-sub-title">
                                    <div class="sub">婢堆勬殶閹诡喗娅ら懗钘夊爱闁帮拷</div>
                                    <div class="sub">鐠愭潙绺剧痪澶哥瑓閹绢喖鎮庨張宥呭</div>
                                </div>
                                <!--<div class="li-bot-title">more</div>-->
                            </a>
                        </li>
                        <li>
                            <a>
                                <div class="li-img">
                                    <img src="../assets/imgs/home/qycc.png"/>
                                </div>
                                <div class="li-ch-title">娴间椒绗熷杈╃崶</div>
                                <div class="li-sub-title">
                                    <div class="sub">娴间椒绗熺€圭偛濮忕仦鏇犮仛閼哥偛褰�</div>
                                    <div class="sub">閺堝秴濮熸稉濠冪仸閼奉亜濮拃銉╂敘</div>
                                </div>
                                <!--<div class="li-bot-title">more</div>-->
                            </a>
                        </li>
                        <li>
                            <a>
                                <div class="li-img">
                                    <img src="../assets/imgs/home/qyst.png"/>
                                </div>
                                <div class="li-ch-title">娴间椒绗熼悽鐔糕偓锟�</div>
                                <div class="li-sub-title">
                                    <div class="sub">閹垫捇鈧姳绱掓稉姘辨晸閹礁婀€</div>
                                    <div class="sub">閺嬪嫬缂撻弲鐑樺弾閸ヮ厼灏�</div>
                                </div>
                                <!--<div class="li-bot-title">more</div>-->
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--妞ゅ湱娲伴崚鍡欒闁劌鍨� -->
        <div class="classify">
            <div class="auto">
                <div class="classify-top">
                    <div class="intro-title-box">
                        <div class="title">娴滃棜袙閹存垳婊戦惃鍕尦閸氬牏琚崹锟�</div>
                    </div>
                </div>
                <div class="classify-bottom">
                    <div class="bottom-content">
                        <el-tabs v-model="activeName"
                                 tab-position="left">
                            <el-tab-pane label="PPP妞ゅ湱娲�"
                                         name="first"
                                         class="tabs">
                                <div class="tab-content">
                                    <div class="tab-title">PPP妞ゅ湱娲�</div>
                                    <div class="tab-body">
                                        <p>閸忓懎鍨庨崣鎴炲皩閸ヨ姤婀佹径褍鐎烽柧鎯邦攽娴兼ê濞嶉敍宀€绮ㄩ崥鍫濇躬瀵ら缚顔曢幎鏇＄カ娑撴挷绗熸０鍡楃厵閻ㄥ嚤PP鐎圭偞鎼风紒蹇涚崣閿涘奔绺炬潻娑欐杺鎼存粌鎷扮粈鍙ョ窗鐠у嫭婀伴崷銊ュ彆閸忚鲸婀囬崝锟狀暙閸╃喓娈戦崥鍫滅稊閿涘矁鍤ч崝娑楃艾閺€鍨盎閸滃瞼銇炴导姘崇カ閺堫剙鎮庢担婊呮畱妤傛顏張宥呭楠炲啿褰撮妴锟�</p>
                                        <p>
                                            娴犲骸鍙忔禍褌绗熼柧鍓ф畱鐟欐帒瀹抽敍灞惧瘹鐎佃偐銇炴导姘崇カ閺堫剙宕熼悪顒佸灗閸氬牅缍旈崣鍌欑瑢閸掍即銆嶉惄顔炬畱閸氬嫮骞嗛懞鍌樷偓鍌氭躬閺€鍨盎閸滃瞼銇炴导姘崇カ閺堫兛琚遍弬閫涚闂傚澹嶇痪鎸庢儗濡椼儻绱濇稉鈧弬褰掓桨鐠佲晜鏂傛惔婊勫閸掔増娓堕崥鍫モ偓渚綪P妞ゅ湱娲伴崥鍫滅稊閺傜櫢绱濋崣锔跨閺傚綊娼版稊鐔活唨缁€鍙ョ窗鐠у嫭婀伴幍鎯у煂閸欏倷绗岄崗顒€鍙￠張宥呭鐠佺偓鏌﹀楦款啎閻ㄥ嫭绗柆鎾扁偓锟�</p>
                                        <p>
                                            閹绘劒绶垫禒搴ゎ啎鐠伮扳偓浣虹彌妞ょ懓鍩岄拃钘夋勾缁涘墽瀹抽惃鍕弿濞翠胶鈻奸惃鍕箛閸斅扳偓鍌欒礋閸︾増鏌熼弨鍨盎娑撳海銇炴导姘崇カ閺堫剚褰佹笟娑€€嶉惄顔兼尒鐠囶澁绱濇稉杞扮窗閸涙ü绱掓稉姘モ偓浣规箒閸忚櫕濮囩挧鍕簚閺嬪嫬绱戠仦鏇犲殠娑撳﹦鍤庢稉瀣畱PPP妞ゅ湱娲伴幘顔兼値閿涘本甯归崝銊с仦娴兼俺绁張顒€顕甈PP妞ゅ湱娲伴崣鍌欑瑢閻滃洦褰佹妯糕偓锟�</p>
                                    </div>
                                    <!--<div class="tab-btn">
                                                          <el-button type="primary">娴滃棜袙閺囨潙顦�</el-button>
                                                      </div>-->
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="閾诲秷绁粔鐔荤ウ"
                                         name="second">
                                <div class="tab-content">
                                    <div class="tab-title">閾诲秷绁粔鐔荤ウ</div>
                                    <div class="tab-body">
                                        <!--<p>楠炲啿褰村鏇＄箻瀵ら缚顢戦崗銊ㄧカ鐎涙劕鍙曢崣绯曗偓鏂衡偓鏂跨紦娣囷繝鍣鹃摶宥囶潳鐠т焦婀侀梽鎰彆閸欓潻绱欏杞颁繆缁夌喕绁﹂敍澶夎礋鐎广垺鍩涢幓鎰返閾诲秷绁粔鐔荤ウ閵嗕胶绮￠拃銉ь潳鐠т胶鐡戞稉鈧粩娆忕础閺堝秴濮熼妴锟�
                                                            閹存垳婊戦惃鍕瑹閸旓繝顣崺鐕傜窗閾诲秷绁粔鐔荤ウ娑撴艾濮熼敍娑滄祮鐠佲晛鎷伴崣妤勵唨閾诲秷绁粔鐔荤ウ鐠у嫪楠囬敍娑樻祼鐎规碍鏁归惄濠勮鐠囦礁鍩滈幎鏇＄カ娑撴艾濮熼敍娑欏复閸欐澹欑粔鐔舵眽閻ㄥ嫮顫ょ挧浣风箽鐠囦線鍣鹃敍娑樻倱娑撴碍濯堕崐鐕傜幢閸氭垿鍣鹃摶宥嗘簚閺嬪嫬鈧喐顑欓敍娑橆暔婢舵牕鈧喐顑欓敍娑氼潳鐠т胶澧块崣妯哄礌閸欏﹤顦╅悶鍡曠瑹閸斺槄绱辩紒蹇旂ス閸溿劏顕楅敍娑樻躬婢у啫鍞存穱婵堚棧閸︽澘灏拋鍓х彌妞ゅ湱娲伴崗顒€寰冨鈧仦鏇＄€虹挧鍕潳鐠т椒绗熼崝鈽呯幢娑撶儤甯堕懖鈥崇摍閸忣剙寰冮妴渚€銆嶉惄顔煎彆閸欑ǹ顕径鏍€虹挧鍕絹娓氭稒濯存穱婵呬簰閸欏﹣鑵戦崶浠嬫懕鐞涘奔绗熼惄鎴犳奖缁狅紕鎮婃慨鏂挎喅娴兼碍澹掗崙鍡欐畱閸忔湹绮稉姘
                                                            閹存垳婊戦惃鍕閼硅弓绗熼崝鈥冲挤娴溠冩惂閿涳拷</p>-->
                                        <p>
                                            閹存垳婊戦惃鍕瑹閸旓繝顣崺鐕傜窗閾诲秷绁粔鐔荤ウ娑撴艾濮熼敍娑滄祮鐠佲晛鎷伴崣妤勵唨閾诲秷绁粔鐔荤ウ鐠у嫪楠囬敍娑樻祼鐎规碍鏁归惄濠勮鐠囦礁鍩滈幎鏇＄カ娑撴艾濮熼敍娑欏复閸欐澹欑粔鐔舵眽閻ㄥ嫮顫ょ挧浣风箽鐠囦線鍣鹃敍娑樻倱娑撴碍濯堕崐鐕傜幢閸氭垿鍣鹃摶宥嗘簚閺嬪嫬鈧喐顑欓敍娑橆暔婢舵牕鈧喐顑欓敍娑氼潳鐠т胶澧块崣妯哄礌閸欏﹤顦╅悶鍡曠瑹閸斺槄绱辩紒蹇旂ス閸溿劏顕楅敍娑樻躬婢у啫鍞存穱婵堚棧閸︽澘灏拋鍓х彌妞ゅ湱娲伴崗顒€寰冨鈧仦鏇＄€虹挧鍕潳鐠т椒绗熼崝鈽呯幢娑撶儤甯堕懖鈥崇摍閸忣剙寰冮妴渚€銆嶉惄顔煎彆閸欑ǹ顕径鏍€虹挧鍕絹娓氭稒濯存穱婵呬簰閸欏﹣鑵戦崶浠嬫懕鐞涘奔绗熼惄鎴犳奖缁狅紕鎮婃慨鏂挎喅娴兼碍澹掗崙鍡欐畱閸忔湹绮稉姘閵嗭拷</p>
                                        <p>閹存垳婊戦惃鍕閼硅弓绗熼崝鈥冲挤娴溠冩惂閿涙俺鐎虹挧鍕潳鐠т降鈧拷 缂佸繗鎯€缁夌喕绁﹂妴渚€鈧氨鏁ょ拋鎯ь槵缁夌喕绁﹂妴渚€顥ｉ張铏诡潳鐠т降鈧浇鍩為懜鍓侇潳鐠т降鈧浇浠堥崥鍫㈩潳鐠т降鈧胶绮″ù搴℃尒鐠団偓鈧拷</p>
                                    </div>
                                    <!--<div class="tab-btn">
                                                          <el-button type="primary">娴滃棜袙閺囨潙顦�</el-button>
                                                      </div>-->
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="閸ユ垝绱掑ǎ閿嬫暭"
                                         name="third">
                                <div class="tab-content">
                                    <div class="tab-title">閸ユ垝绱掑ǎ閿嬫暭</div>
                                    <div class="tab-body">
                                        <p>娑撳搫瀵橀幏顒佺毌閽€銉ょ磼娑撴艾婀崘鍛畱闂堢偛娴楅張澶庣カ閺堫剚濮囩挧鍕瘜娴ｆ挸寮稉搴℃禇閺堝绱掓稉姘暭閸掑爼鍣哥紒鍕剁礉瀵よ櫣鐝涢崑銉ュ弿濞ｅ嘲鎮庨幍鈧張澶婂煑娴间椒绗熷▽鑽ゆ倞閺堝搫鍩楅幓鎰返閺堝秴濮熼妴锟�</p>
                                        <p>閸掆晝鏁ら崶鎴掔磼閸︺劍鐗宠箛鍐ч獓娑撴岸顣崺鐔烘畱闁插秷顩﹁ぐ鍗炴惙閸旀冻绱濈敮锕€濮╂禍褌绗熺紒鎾寸€崡鍥╅獓閵嗭拷</p>
                                        <p>鐠嬪啯鏆ｉ崶鎴掔磼鏉╂劘鎯€濡€崇础閿涘本褰侀崡鍥カ濠ф劙鍘ょ純顔芥櫏閻滃洢鈧拷</p>
                                        <p>閺€顖涘瘮閸氬嫮琚粈鍙ョ窗鐠у嫭婀伴幎鏇＄カ閹存牕寮懖鈥崇唨绾偓鐠佺偓鏌﹂妴浣稿彆閻€劋绨ㄦ稉姘モ偓浣稿彆閸忚鲸婀囬崝锛勭搼妫板棗鐓欐い鍦窗閿涘奔濞囬幎鏇＄カ閼板懎婀獮宕囩搼缁旂偘绨ゆ稉顓″箯閸欐牕鎮庨悶鍡樻暪閻╁ǹ鈧拷</p>
                                    </div>
                                    <!--<div class="tab-btn">
                                                          <el-button type="primary">娴滃棜袙閺囨潙顦�</el-button>
                                                      </div>-->
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="閹舵洝绁摶宥堢カ"
                                         name="fourth">
                                <div class="tab-content">
                                    <div class="tab-title">閹舵洝绁摶宥堢カ</div>
                                    <div class="tab-body">
                                        <p>閾诲秴娲撳ù铚傜鐠愵澁绱濋幎鏇炪亯娑撳绠ｇ紘搴磼娑撹桨绱掓稉姘嚠閸愬懏濮囩挧鍕┾偓浣割嚠婢舵牗濮囩挧鍕┾偓浣割嚠婢舵牞鐎虹挧鍕┾偓浣歌嫙鐠愵厹鈧線鍣告径褑绁禍褔鍣哥紒鍕┾偓浣割嚠婢舵牗濯存穱婵囧絹娓氭稒绗柆鎾虫嫲鐠у嫯顔嗛妴锟�</p>
                                        <p>濮瑰洭娉﹂崥鍕閺€鍨盎閺夊啫鈻夌純鎴犵彲閵嗕焦绻佹惔锕€鎮庢担婊勬殶閹诡喖閽╅崣鑸偓浣规殶閹诡喗婀囬崝鈥虫櫌缁涘绱濇禒銉ュ挤闁炬儼顢戦崘鍛村劥鐎广垺鍩涢崗宕囬兇閵嗕椒姘﹂弰鎾扁偓浣蜂繆鐠愰顓搁悶鍡欑搼娑撴艾濮熷ú璇插З閼惧嘲褰囨い鍦窗閵嗕浇绁柌鎴炴殶閹诡噯绱濈划鎯у櫙閸栧綊鍘ら幎鏇＄€虹挧鍕箛閸斅扳偓锟�</p>
                                        <p>闁俺绻冪痪澶哥瑐+缁惧じ绗呴妴浣圭垼閸戝棗瀵�+娑擃亝鈧冨閺堝秴濮熸担鎾堕兇閿涘矁袙閸愯櫕濮囬摶宥堢カ娑撳秴顕粔浼存６妫版ɑ鏆ｉ崥鍫ャ€嶉惄顔芥煙閵嗕浇绁柌鎴炴煙閵嗕焦婀囬崝鈥虫櫌閵嗕浇绁張顒佹簚閺嬪嫮娈戠挧鍕爱閿涘苯鑸伴幋鎰€虹挧鍕獓娑撴岸鎽奸梻顓犲箚閵嗭拷</p>
                                        <p>閸掆晝鏁ゆ禍鍝勪紣閺呴缚鍏樼粻妤佺《閿涘苯顕导浣风瑹閾诲秷绁棁鈧Ч鍌欑瑢閹舵洝绁禍楦跨箻鐞涘本娅ら懗钘夊爱闁板稄绱濇禒銉у殠娑撳﹣淇婇幁顖涙尦閸氬牏娈戦弬鐟扮础閹绘劙鐝幎鏇＄€虹挧鍕嚠閹恒儲鍨氶崝鐔哄芳閵嗭拷</p>
                                        <p>娑撴挻鏁炴禍搴㈠ⅵ闁姾绁張顑跨瑢妞ゅ湱娲扮划鎯у櫙鐎佃甯撮惃鍕挬閸欏府绱濋幓鎰扮彯鐠у嫭婀伴幍楣冦€嶉惄顔衡偓渚€銆嶉惄顔藉鐠у嫭婀伴惃鍕櫏閻滃洤鎷伴幋鎰閻滃洢鈧倷绮犻張宥呭娑擃厼娴楁禍褌绗熼崡鍥╅獓閻ㄥ嫯顫楁惔锕€鍙嗛幍瀣剁礉閹垫寧濯撮崪灞介ケ鐞涘苯娴楅張澶娿亣閸ㄥ鏅㈡稉姘舵懕鐞涘瞼娈戠粈鍙ョ窗鐠愶絼鎹㈤妴锟�</p>
                                    </div>
                                    <!--<div class="tab-btn">
                                                          <el-button type="primary">娴滃棜袙閺囨潙顦�</el-button>
                                                      </div>-->
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="閼哄倽鍏橀崙蹇斿笓"
                                         name="five">
                                <div class="tab-content">
                                    <div class="tab-title">閼哄倽鍏橀崙蹇斿笓</div>
                                    <div class="tab-body">
                                        閹存垼顢戦崷銊ョ秼閸撳秴缂撶拋鍓х法娑撴垝鑵戦崶濮愨偓浣瑰腹鏉╂稓璞㈤懝鎻掑絺鐏炴洜娈戦懗灞炬珯娑撳绱濋柦鍫濐嚠閼哄倽鍏橀張宥呭妫板棗鐓欓悽銊ㄥ厴閸楁洑缍呮稉搴ゅΝ閼宠姤婀囬崝鈥冲彆閸欓晲绠ｉ梻瀵告畱娣団剝浼呮稉宥咁嚠缁夋壆娈戠粈鍙ョ窗閻ユ稓鍋ｉ敍灞解偓鎯х妇閹垫捇鈧姵甯归崙楦垮Ν閼宠姤婀囬崝鈥抽挬閸欏府绱濈紒鐓庢値閻€劏鍏樻导浣风瑹閵嗕浇濡懗鑺ユ箛閸斺€冲彆閸欑ǹ寮烽幋鎴ｎ攽娑撴艾濮熸穱鈩冧紖閿涘苯鐤勯悳鎷屽Ν閼宠姤婀囬崝鈥茬返缂佹瑤绗岄棁鈧Ч鍌滄畱閺呴缚鍏橀幘顔兼値閵嗕浇鍤滈崝銊ュ爱闁板稄绱濋獮鍫曗偓姘崇箖缁惧じ绗傜痪澶哥瑓缂佹挸鎮庨惃鍕煙瀵繋璐熼懞鍌濆厴閺堝秴濮熸い鍦窗閹绘劒绶甸柊宥咁殰闁叉垼鐎洪張宥呭閿涘奔璐熼幋鎴ｎ攽鐎广垺鍩涢幍鎾烩偓鐘插弿閺傛壆娈戦弲楦垮厴闁叉垼鐎洪張宥呭楠炲啿褰撮妴锟�
                                    </div>
                                    <!--<div class="tab-btn">
                                                          <el-button type="primary">娴滃棜袙閺囨潙顦�</el-button>
                                                      </div>-->
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="闁叉垼鐎洪幍鎯颁紶"
                                         name="six">
                                <div class="tab-content">
                                    <div class="tab-title">闁叉垼鐎洪幍鎯颁紶</div>
                                    <div class="tab-body">
                                        <p>閳ユ粍澹庣拹锟�+閹佃埖娅ら垾婵撶礉閺堝鏅ユ晶鐐插繁鐠愵偄娲堕崷鏉垮隘閻ㄥ嫰鈧姾顢呴懗钘夊閵嗭拷</p>
                                        <p>閹存垳婊戦惃鍕箛閸斺槄绱�</p>
                                        <p>妞ゅ湱娲伴幘顔兼値閿涙碍鏂傛惔婊嗗枠娑旂増婀囬崝掳鈧赋PP鐠愰攱顑欑粵锟� </p>
                                        <p>娴溠傜瑹閹绢喖鎮庨敍姘彆閸欙拷+閸╁搫婀�+閸氬牅缍旂粈锟�+閸愭粍鍩涢妴浣筋吂閸楋拷+閸忣剙寰�/閸氬牅缍旂粈锟�+閸愭粍鍩涢妴浣哄閻ｆ粍澧崗锟�+閸掑棛瀛╃粵锟�</p>
                                        <p>閸忣剛娉幘顔兼値閿涙艾鍙曢惄濠冨礃鐠х姰鈧礁鍙曢惄濠冩た閸斻劎鐡� </p>
                                        <p>閹存垳婊戦惃鍕喘閸斿尅绱�</p>
                                        <p>閳硷拷 閹碱厼缂撶挧鍕櫨缁狅紕鎮婄純鎴犵捕閿涘奔绌舵禍搴ょカ闁叉垼鐨熸惔锕€鎷伴惄鎴炲付閿涘奔绻氶梾婊嗙カ闁叉垵鐣ㄩ崗銊ょ┒閹硅渹濞囬悽銊ｂ偓锟�</p>
                                        <p>閳硷拷 閼奉亣鎯€閻㈤潧鏅㈤垾鏂挎澖閾诲秴鏅㈤崝鈥抽挬閸欎即鏀㈤崬顔界闁搫绱濋柇鈧拠宄板棘閸旂娀鍣鹃摶宥嗗鐠愵偄鍟橀崜顖欓獓閸濅焦甯规禒瀣╃窗閿涘苯搴滈崝鈺勭箻娑撯偓濮濄儲澧﹂崫宥咁吂閹村嘲绔堕崷铏圭叀閸氬秴瀹抽妴锟�</p>
                                        <p>
                                            閳硷拷 閸忓懎鍨庨崣鎴炲皩閺€鍨盎閸滃苯閽╅崣鎵畱婢х偘淇婃担婊呮暏閿涘奔绗屾い鍦窗閹碘偓閸︺劌婀撮弨鍨盎閸氬牅缍斿▽鐔尖偓姘剧礉鐠佸墽鐝涢垾婊呰雹閼规彃褰傜仦鏇炵唨闁叉垟鈧繐绱濋崥鍫滅稊閸欐垼顢戦幍鎯颁紶閸婂搫鍩滈敍灞惧ⅵ瀵偓閹垫儼浼犵挧鍕櫨閺備即鈧岸浜鹃敍娑椾簰閻楃澹婃禍褌绗熸禍褍鎼ф稉鐑樼垼閻ㄥ嫸绱濋崣鎴濈€烽悥鍗炵妇閹垫儼浼犻悶鍡氬偍娴溠冩惂閿涘本瀚囩€硅棄搴滈幍鎯扮熅瀵板嫨鈧拷</p>
                                    </div>
                                    <!--<div class="tab-btn">
                                                          <el-button type="primary">娴滃棜袙閺囨潙顦�</el-button>
                                                      </div>-->
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="閺冨懏鐖堕幒銊ょ矙"
                                         name="seven">
                                <div class="tab-content">
                                    <div class="tab-title">閺冨懏鐖堕幒銊ょ矙</div>
                                    <div class="tab-body">
                                        <p>閺冨懏鐖舵禍褌绗熼幏娑樻櫌娑撴挷绗熼張宥呭</p>
                                        <p>鐠佲晜姊惧〒鎼併€嶉惄顔芥煙閸滃矁绁柌鎴炴煙閻╁瓨甯寸€佃甯撮敍灞惧ⅵ闁碍姊惧〒闀愰獓娑撴碍濮囬摶宥堢カ濞撶娀浜鹃敍灞艰礋娑擃厼娴楅弮鍛埗閺傛澘褰傜仦鏇熷絻娑撳﹨绁張顒傛畱缂堝懓鍞ㄩ敍锟�</p>
                                        <p>
                                            閳硷拷 閸掓稒鏌婇惃鍕⒕濞撻晲楠囨稉姘舵懠娑撳﹣绗呭〒绋挎櫌閺堢儤鎸抽崥鍫濋挬閸欏府绱濇稉鏄忣洣闂堛垹鎮滄导浣风瑹閸滃本鏂傛惔婊勬箛閸斺€茬艾閺冨懏鐖舵禍褌绗熼柧鍓ф畱閺堚偓閸撳秶顏垾鏂衡偓鏃€姊惧〒鍛婂閾诲秷绁稉搴㈠珣閸熷棴绱濋柅姘崇箖娴滄帟浠堢純鎴欌偓浣风隘鐠侊紕鐣婚妴浣搞亣閺佺増宓侀敍宀冨毀閸旀稐绨稉鐑樻⒕濞撻晲楠囨稉姘舵懠妞ゅ湱娲伴弬骞库偓浣界カ濠ф劖鏌熼妴浣界カ閺堫剚鏌熼敍灞惧鐠у嫬鏅㈤妴浣哥磻閸欐垵鏅㈤妴浣界箥閽€銉ユ櫌閵嗕線鍘ゆ總妤€鏅㈤崣濠冩杺鎼存粍婧€閺嬪嫮鐡戞潻娑滎攽閸熷棙婧€閹绢喖鎮庨敍灞藉簻閸斺晜姊惧〒鎼併€嶉惄顔芥煙閵嗕浇绁┃鎰煙閹垫儳鍩岄張鈧崥鍫モ偓鍌滄畱閹舵洝绁弬鐧哥礉鐎圭偟骞囬幋鎰閾诲秷绁敍灞藉簻閸斺晜姊惧〒鍛婂鐠у嫭鏌熼幍鎯у煂閺堚偓閸氬牓鈧倻娈戦弮鍛埗妞ゅ湱娲伴敍灞界杽閻滅増鍨氶崝鐔稿珣閸熷棎鈧拷 </p>
                                        <p>
                                            閳硷拷 瀵よ櫣鐝涘ù鐑藉櫤閺冨懏鐖堕幎鏇＄€虹挧鍕櫌娑撴碍鏆熼幑顔肩氨閿涘矂鈧俺绻冮垾婊呭殠娑撳⿵绱滅痪澶哥瑓閳ユ縿鈧讲鈧粍鐖ｉ崙鍡楀閿涘閲滈幀褍瀵查垾婵堟畱閸熷棙婧€閹绢喖鎮庨張宥呭娴ｆ挾閮撮敍宀€鐛婇惍瀛樻閺佸牊鈧呯叚閵嗕椒淇婇幁顖炲櫤鐏忔垯鈧礁濂栭崫宥呭鐏忓繈鈧礁褰堟导妤呮桨缁愬嫨鈧線鈧瀚ㄩ幀褍鎬ラ惃鍕炊缂佺喐姊惧〒鍛婂珣閸熷棔绗岄摶宥堢カ濡€崇础閻ㄥ嫬鐪梽鎰偓褝绱濈拋鈺傛⒕濞撴悂銆嶉惄顔芥煙閵嗕浇绁張顒佹煙閸︺劎缍夋稉濠呭殰閻拷 閳ユ粍鎹ｉ柌蹇涘帳鐎靛厜鈧繐绱濇稉鐑樻⒕濞撻晲楠囨稉姘舵懠娑撳﹣绗呭〒绋挎櫌鐎硅泛鎷伴弨鍨盎閹绘劒绶垫妯绘櫏閻滃洢鈧線鎷＄€佃鈧傜瑢娓氬灝鍩勯幀褍宸遍惃鍕閾诲秷绁€佃甯撮幘顔兼値閺堝秴濮熼敍灞惧ⅵ闁碍姊惧〒闀愰獓娑撴岸鎽奸幎鏇＄€虹挧鍕闁搫绱濋幓鎰扮彯娴间椒绗熼崪灞炬杺鎼存粍姊惧〒姝岀€虹挧鍕瑢閹锋稑鏅㈤惃鍕灇閺佸牄鈧拷 </p>
                                        <p>
                                            閳硷拷 閸忋劑娼板鏇㈩暙娴间椒绗熼崪灞炬杺鎼存粎鐛婇惍缈犵炊缂佺喐姊惧〒鍛婂珣閸熷棔绗岄摶宥堢カ濡€崇础閿涘矁顔€閺冨懏鐖舵い鍦窗閺傚箍鈧浇绁┃鎰煙閵嗕浇绁張顒佹煙閸忋劑娼扮€圭偟骞囬惄瀛樺复鐎佃甯撮敍灞藉И閹恒劋鑵戦崶鑺ユ⒕濞撻晲绗熼崗銊╂桨娴兼ê瀵查崡鍥╅獓閿涘苯鎮滈弴鎾彯鐏炲倹顐奸崣顖涘瘮缂侇厼褰傜仦鏇礉閹绘劙鐝弫缈犵秼閸欐垵鐫嶅鏉戦挬閵嗗倸鍙忛棃銏犵杽閻滄澘鍙曢崣闀愮幆閸婇棿绗岀€广垺鍩涙禒宄扳偓绗衡偓浣恒仦娴兼矮鐜崐鑲╂畱鐎瑰瞼绶ㄧ紒鐔剁閵嗭拷 </p>
                                    </div>
                                    <!--<div class="tab-btn">
                                                          <el-button type="primary">娴滃棜袙閺囨潙顦�</el-button>
                                                      </div>-->
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="閺傚洤瀵叉禍褌绗�"
                                         name="eight">
                                <div class="tab-content">
                                    <div class="tab-title">閺傚洤瀵叉禍褌绗�</div>
                                    <div class="tab-body">
                                        <p>
                                            閹存垳婊戦弮銊ユ躬閹垫捇鈧碍鏋冮崠鏍﹂獓娑撴矮淇婇幁顖氼梿閸ㄦ帪绱濇潻鎰暏瀵ら缚顢戞惔鐐层亣閻ㄥ嫬顓归幋鐤カ濠ф劕鎷伴崗鍫ｇ箻閻ㄥ嫪淇婇幁顖涘Η閺堫垱澧滃▓鍏歌礋楠炲灝銇囬弬鍥у缁绱掓稉姘絹娓氭稐绔存稉顏冧繆閹垯姘﹀ù浣碘偓浣界カ濠ф劕鍙℃禍顐犫偓浣风喘閸斿じ绨扮悰銉ｂ偓浣界カ闁叉垶鏁幐浣烘畱娴溿倖绁﹂幘顔兼値楠炲啿褰撮妴锟�</p>
                                        <p>閳硷拷 閺傚洤瀵查崥鍫滅稊閿涙矮绺炬潻娑楅獓娑撴艾宕楁担婊愮礉娑撳搫鎮囩猾缁樻瀮閸栨牜琚ú璇插З閸滃矂銆嶉惄顔藉絹娓氭稒濡ч張顖樷偓浣告簚閸﹁埇鈧椒姹夐崨妯肩搼閺傚綊娼伴惃鍕尦閸氬牊鏁幐渚婄礉娑旂喎褰叉禒銉よ礋閺傚洤瀵叉禍褌绗熼崶顓炲隘閹绘劒绶甸崥鍕閹锋稑鏅㈤妴浣告値娴ｆ粎娈戠敮顔煎И閵嗭拷</p>
                                        <p>閳硷拷 閺傚洤瀵查幎鏇＄カ閿涙矮璐熼弬鍥у缁銆嶉惄顔兼嫲濞茶濮╁鏇炲弳閹存鏆愰崥鍫滅稊閼板懌鈧焦褰佹笟娑€€嶉惄顔跨€虹挧鍕嫲濞茶濮╃挧鐐插И缁涘绁柌鎴炴暜閹镐降鈧拷</p>
                                        <p>閸︺劍婀囬崝鈩冩尦閸氬牊婢橀崸妞捐厬閿涘本鍨滄禒顑跨瘍閸欘垯浜掓稉鐑樻瀮閸栨牜琚导浣风瑹閻ㄥ嫬鎮囩猾缁樻瀮閸栨牗婀囬崝掳鈧椒楠囬崫浣瑰絹娓氭稐姘﹂弰鎾存尦閸氬牞绱濇稉鐑樻瀮閸栨牜琚导浣风瑹閹绘劒绶甸崗銊╂桨閻ㄥ嫪绗熼崝鈩冩箛閸斅扳偓锟�</p>
                                    </div>
                                    <!--<div class="tab-btn">
                                                          <el-button type="primary">娴滃棜袙閺囨潙顦�</el-button>
                                                      </div>-->
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>

        </div>
        <!--閹存垳婊戦惃鍕喘閸斿潡鍎撮崚锟�-->
        <div class="advan">
            <div class="advan-pagination auto">
                <div class="intro-title-box">
                    <div class="title">閹存垳婊戦惃鍕喘閸旓拷 閹存垳婊戦惃鍕杽閸旓拷</div>
                    <div class="title-des">娑撴挷绗熼惃鍕尦閸氬牆娲熼梼鐕傜礉閸忓牐绻橀惃鍕亣閺佺増宓佹禍鍝勪紣閺呴缚鍏橀幎鈧張锟�</div>
                </div>
                <div class="advan-accout">
                    <essp-num-effect></essp-num-effect>
                </div>
                <div class="advan-detail">
                    <div class="detail-content auto">
                        <div class="ali-main-serve">
                            <div class="y-row">
                            </div>
                            <div class="y-row y-clear"
                                 style="position: relative;">
                                <div class="main-img"
                                     id="serve-img-area"
                                     style="position: relative;">
                                    <img src="../assets/imgs/home/map.png"/>
                                    <div class="point-area"
                                         style="top:218px; left: 712px; position: absolute; width: 80px; height: 80px; visibility: visible; opacity: 1;">

                                        <div class="point point-10"></div>
                                        <div class="point point-70"></div>
                                    </div>
                                    <div class="point-area"
                                         style="top: 320px; left: 810px; position: absolute; width: 110px; height: 110px; visibility: visible; opacity: 1;">

                                        <div class="point point-10"></div>
                                        <div class="point point-40"></div>
                                        <div class="point point-shadow point-80"></div>
                                    </div>
                                    <div class="point-area"
                                         style="top: 76px; left: 790px; position: absolute; width: 80px; height: 80px; visibility: visible; opacity: 1;">

                                        <div class="point point-10"></div>
                                        <div class="point point-70"></div>
                                    </div>
                                    <div class="point-area"
                                         style="top: 260px; left: 200px; position: absolute; width: 100px; height: 100px; visibility: visible; opacity: 1;">

                                        <div class="point point-10"></div>
                                        <div class="point point-40"></div>
                                        <div class="point point-shadow point-80"></div>
                                    </div>
                                    <div class="point-area"
                                         style="top: 60px; left: 676px; position: absolute; width: 140px; height: 140px; visibility: visible; opacity: 1;">

                                        <div class="point point-10"></div>
                                        <div class="point point-40"></div>
                                        <div class="point point-shadow point-80"></div>
                                    </div>
                                    <div class="point-area"
                                         style="top: 48px; left: 400px; position: absolute; width: 150px; height: 150px; visibility: visible; opacity: 1;">

                                        <div class="point point-10"></div>
                                        <div class="point point-40"></div>
                                        <div class="point point-shadow point-80"></div>
                                    </div>
                                    <div class="point-area"
                                         style="top: 300px; left: 390px; position: absolute; width: 150px; height: 150px; visibility: visible; opacity: 1;">

                                        <div class="point point-10"></div>
                                        <div class="point point-40"></div>
                                        <div class="point point-shadow point-80"></div>
                                    </div>
                                    <!--    <div class="point-area" style="top: 125px; left: 820px; position: absolute; width: 200px; height: 200px; visibility: visible; opacity: 1;">

                                                       <div class="point point-10"></div>
                                                       <div class="point point-40"></div>
                                                       <div class="point point-shadow point-80"></div>
                                                      </div> -->
                                    <!--   <div class="point-area" style="top: 195px; left: 900px; position: absolute; width: 80px; height: 80px; visibility: visible; opacity: 1;">

                                                       <div class="point point-10"></div>
                                                       <div class="point point-70"></div>
                                                      </div> -->
                                    <div class="point-area"
                                         style="top: 128px; left: 510px; position: absolute; width: 110px; height: 110px; visibility: visible; opacity: 1;">

                                        <div class="point point-10"></div>
                                        <div class="point point-40"></div>
                                        <div class="point point-shadow point-80"></div>
                                    </div>
                                    <!--    <div class="point-area" style="top: 50px; left: 542px; position: absolute; width: 80px; height: 80px; visibility: visible; opacity: 1;">

                                                       <div class="point point-10"></div>
                                                       <div class="point point-70"></div>
                                                      </div> -->
                                    <div class="point-area"
                                         style="top: 90px; left: 145px; position: absolute; width: 80px; height: 80px; visibility: visible; opacity: 1;">
                                        <div class="point point-10"></div>
                                        <div class="point point-70"></div>
                                    </div>
                                    <!--  <div class="point-area" style="top: 286px; left: 870px; position: absolute; width: 120px; height: 120px; visibility: visible; opacity: 1;">
                                                       <div class="point point-10"></div>
                                                       <div class="point point-40"></div>
                                                       <div class="point point-shadow point-80"></div>
                                                      </div> -->
                                    <!--   <div class="point-area" style="top: 355px; left: 958px; position: absolute; width: 150px; height: 150px; visibility: visible; opacity: 1;">
                                                       <p class="point-name" style="position: absolute; top: 65px; left: 85px;">濠㈠啿銇囬崚鈺€绨�</p>
                                                      <a href="https://www.aliyun.com/chinaglobal/home?tabId=6#guid-633594" target="_blank" class="point point-dot"></a>
                                                       <div class="point point-10"></div>
                                                       <div class="point point-40"></div>
                                                       <div class="point point-shadow point-80"></div>
                                                      </div> -->

                                    <div class="advan-txt">
                                        <p>瀵ら缚顔曢柧鎯邦攽闁叉垼鐎洪張宥呭閸忋劎鎮嗛悧鍫濇禈</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--閸溿劏顕楅敍宀勬付濮瑰倹膩閸э拷-->
        <div class="rqm">
            <div class="rqm-title">娴间椒绗熼獮鍐插酱鐎圭偞妞傞悜顓㈡，鐠у嫯顔�</div>
            <div class="rqm-pagination auto">
                <div class="rqm-item left"
                     @click="rqmTab(0)"
                     :class="{active: rqmIndex === 0}">楠炲啿褰寸挧鍕唵
                </div>
                <div class="rqm-item right left"
                     @click="rqmTab(1)"
                     :class="{active: rqmIndex === 1}">閻戭參妫棁鈧Ч锟�
                </div>
                <!-- <div class="rqm-item right"
                             @click="rqmTab(2)"
                             :class="{active: rqmIndex === 2}">娑擃亝鈧冨閸熷棙婧€</div> -->
                <div class="rqm-detail"
                     v-show="rqmIndex === 0">
                    <ul class="esspclearfix">
                        <li class="news-1"
                            v-for="(item,i) in infoList"
                            :key="i">
                            <a>
                                <div class="item-box">
                                    <img :src="item.titleImg"
                                         @click="infoDetail(item.informationId)"/>
                                    <div class="box-title">{{item.informationTitle}}</div>
                                </div>
                                <!--<div class="item-bottom">-->
                                <!--<div class="bottom-txt bt1">{{item.content}}</div>-->
                                <!--<div class="bottom-txt bt2">{{item.infoDetail-->
                                <!--}}</div>-->
                                <!--</div>-->
                            </a>
                        </li>

                    </ul>
                </div>

                <div class="rqm-detail"
                     v-show="rqmIndex === 1">
                    <ul class="esspclearfix">
                        <li class="news-2 pointer"
                            v-for="(item,index) in hotRqmList"
                            :key="index"
                            @click="toDetailrqm(item)">
                            <div class="rqm-top">
                                <img class="top-img"
                                     :src="getPath(item.rqmRole)"/>
                                <span class="top-txt"
                                      :id="item.bsnRqmId">{{item.prjNm}}</span>
                                <div class="top-right">
                                    <div v-if="item.fcsFlage == '1'"
                                         class="top-right-content">
                                        <img src="../assets/imgs/requirehall/icon_like_red.png"/>
                                        <span class="right-center">瀹告彃鍙у▔锟�</span>
                                    </div>
                                    <div v-else
                                         class="top-right-content">
                                        <img src="../assets/imgs/searchpage/icon_like.png"/>
                                        <span class="right-center">閸忚櫕鏁�</span>
                                    </div>
                                    <span>(</span><span>{{item.fcsNm}}</span><span>瀹告彃鍙у▔锟�)</span>
                                </div>
                            </div>
                            <div class="rqm-bottom">
                                <div class="bottom-item">
                                    <span>閹碘偓閸︺劌婀�:</span>
                                    <span>{{item.areaName}}</span>
                                </div>
                                <div class="bottom-item mag-1">
                                    <span>閸欐垵绔烽弮鍫曟？:</span>
                                    <span>{{item.ancDtStr}}</span>
                                </div>
                                <div class="bottom-item mag-2">
                                    <div class="item-num">
                                        <img class="num-img"
                                             src="../assets/imgs/usercenter/icon_view.png"/>
                                        <span class="num-txt">{{item.clckNm}}</span>
                                    </div>
                                    <!--<div class="item-num">
                                                          <img class="num-img"
                                                               src="../assets/imgs/searchpage/icon_like.png" />
                                                          <span class="num-txt">{{item.fcsNm}}</span>
                                                      </div>-->
                                    <!--<div class="item-num">
                                                          <img class="num-img" src="../assets/imgs/usercenter/icon_comment.png" />
                                                          <span class="num-txt">357</span>
                                                      </div>-->
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="refresh">
                        <div class="ref-content">
                            <img class="ref-img"
                                 src="../assets/imgs/home/refresh.png"/>
                            <span class="ref-txt"
                                  @click="getHotRqm">閹诡澀绔撮幍锟�</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="scroll-box"
                             v-show="rqmIndex === 2">
                            <ul v-if="perbsopContents.length>0">
                                <li v-for="(item,index) in perbsopContents"
                                    :key="index"
                                    @click="toPerbsopDetail(item)">
                                    <span> {{item.content}}</span>
                                    <div class="perbsop-arrow"></div>
                                </li>
                            </ul>
                            <div class="notice">
                                <div v-if="!userInfo || isSubscribe=='0' || (isSubscribe=='' && perbsopContents.length<=0)"
                                     class="notice-content">
                                    <div class="notice-img"></div>
                                    <p class="notice-p1">濞屸剝婀侀崚璺虹暰閸熷棙婧€</p>
                                    <p class="notice-p2">韫囶偅娼电拠鏇＄槸娑擃亝鈧冨閸熷棙婧€閸掕泛鐣鹃崥锟�</p>
                                    <el-button class="btn"
                                               type="primary"
                                               @click="goToPerbsop()">妞诡兛绗傜€规艾鍩�</el-button>
                                </div>
                                <div v-if="(isSubscribe!='' && isSubscribe!='0' && perbsopContents.length<=0)"
                                     class="no-content-notice">
                                    <div class="no-content-img"></div>
                                    <p class="no-content-p">閺嗗倹婀弨璺哄煂閹恒劑鈧焦绉烽幁锟�</p>
                                </div>
                            </div>
                        </div> -->
            </div>
        </div>
        <!--閸氬牅缍旀导娆庡嵆濡€虫健-->
        <div class="partner">
            <div class="partner-title">閸氬牅缍旀导娆庡嵆</div>
            <div class="partner-pagination">
                <el-tabs v-model="partnerName"
                         class="el_partner">
                    <el-tab-pane label="瀵ら缚顢戦崥鍫滅稊閺堢儤鐎�"
                                 name="first">
                        <div class="bank auto">
                            <ul class="esspclearfix">
                                <li @click="bankClick('cx')">
                                    <div class="ease-out"></div>
                                    <div class="ease-in">
                                        <div class="box-1">
                                            <div class="title">
                                                <img src="../assets/imgs/home/jx-cx.png"/>
                                            </div>
                                            <div class="txt-content">
                                                <div class="txt">閺呯儤鍙庨崹瀣偍闂勨晛鍙曢崣锟�</div>
                                                <div class="txt">閼峰疇鐦� 閹峰懎缍� 缁崘绻� 鐡掑懓绉�</div>
                                                <div class="txt">鐎规艾鍩楁稉鎾崇潣娣囨繈娅撻弬瑙勵攳</div>
                                            </div>
                                        </div>
                                        <div class="box-2">
                                            <div class="box2-title">鐠愩垽娅�</div>
                                            <div class="txt-content">
                                                <div class="txt">娴间浇鍌ㄩ妴浣镐紣缁嬪鐡戠拹顫獓娣囨繈娅�</div>
                                                <div class="txt">闂嗗洣瀵岄妴浣稿彆娴兼鐡戠拹锝勬崲娣囨繈娅�</div>
                                                <div class="txt">娴滈缚闊╅妴浣告礋闂冪喓鐡戦幇蹇擃樆娣囨繈娅�</div>
                                                <div class="txt">濮樼鐭鹃妴浣稿彆鐠侯垳鐡戠拹褑绻嶆穱婵嬫珦</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li @click="bankClick('qh')">
                                    <div class="ease-out"></div>
                                    <div class="ease-in">
                                        <div class="box-1">
                                            <div class="title">
                                                <img src="../assets/imgs/home/jx-qh.png"/>
                                            </div>
                                            <div class="txt-content">
                                                <div class="txt">閹垫寧鍋嶉幍鈧張锟�</div>
                                                <div class="txt">娑撴挻鏁炵敮鍌氭簚妞嬪酣娅撶粻锛勬倞</div>
                                                <div class="txt">瀵ゅ搫缍嬫稉瀣╀繆閺堫亝娼�</div>
                                            </div>
                                        </div>
                                        <div class="box-2">
                                            <div class="box2-title">閺堢喕鎻�</div>
                                            <div class="txt-content">
                                                <div class="txt">閺堢喕鎻ｇ紒蹇曢偗閺堝秴濮�</div>
                                                <div class="txt">鐠у嫪楠囩粻锛勬倞閺堝秴濮�</div>
                                                <div class="txt">妞嬪酣娅撶粻锛勬倞鐎涙劕鍙曢崣锟�</div>
                                                <div class="txt">閸忋劑娼扮敮鍌氭簚妞嬪酣娅撶粻锛勬倞閺堝秴濮�</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li @click="bankClick('zb')">
                                    <div class="ease-out"></div>
                                    <div class="ease-in">
                                        <div class="box-1">
                                            <div class="title">
                                                <img src="../assets/imgs/home/jx-zb.png"/>
                                            </div>
                                            <div class="txt-content">
                                                <div class="txt">閹舵洝绁� 閹舵洝顢� 閹绢喖鎮�</div>
                                                <div class="txt">缁変礁瀚欓崺娲櫨濞ｅ崬瀹抽崥鍫滅稊</div>
                                                <div class="txt">娑撳﹤绔堕崗顒€寰冮崗銊╂桨鐟曞棛娲� </div>
                                            </div>
                                        </div>
                                        <div class="box-2">
                                            <div class="box2-title">鐠у嫭婀�</div>
                                            <div class="txt-content">
                                                <div class="txt">鐠у嫪楠囩拠浣稿煖閸栵拷</div>
                                                <div class="txt">婢堆呰鐠у嫪楠囬柊宥囩枂閵嗕胶绮嶉崥鍫熷鐠э拷</div>
                                                <div class="txt">楠炴儼鍠橀幘顔兼値妞ら箖妫�</div>
                                                <div class="txt">娴兼ǹ宸濋棃鐐寸垼閸婄儤娼堥摶宥堢カ</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li @click="bankClick('zl')">
                                    <div class="ease-out"></div>
                                    <div class="ease-in">
                                        <div class="box-1">
                                            <div class="title">
                                                <img src="../assets/imgs/home/jx-zl.png"/>
                                            </div>
                                            <div class="txt-content">
                                                <div class="txt">妞嬬偞婧€缁夌喕绁�</div>
                                                <div class="txt">缂佽儻澹婄粔鐔荤ウ</div>
                                                <div class="txt">濮樻垹鏁撻張宥呭</div>
                                            </div>
                                        </div>
                                        <div class="box-2">
                                            <div class="box2-title">缁夌喕绁�</div>
                                            <div class="txt-content">
                                                <div class="txt">閸ヨ棄鍞存＃鏍ㄥ闁叉垼鐎虹粔鐔荤ウ閸忣剙寰�</div>
                                                <div class="txt">瀵ら缚顔曢柧鎯邦攽閸忋劏绁€涙劕鍙曢崣锟�</div>
                                                <div class="txt">閸忣厼銇囨导妯哄◢娑撴艾濮熸０鍡楃厵</div>
                                                <div class="txt">婢舵艾鍘撻崠鏍櫨閾诲秶顫ょ挧浣规箛閸旓拷</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li @click="bankClick('xt')">
                                    <div class="ease-out"></div>
                                    <div class="ease-in">
                                        <div class="box-1">
                                            <div class="title">
                                                <img src="../assets/imgs/home/jx-xt.png"/>
                                            </div>
                                            <div class="txt-content">
                                                <div class="txt">缁変礁瀚欓幎鏇☆攽娑撴艾濮�</div>
                                                <div class="txt">鐠у嫪楠囩粻锛勬倞娑撴艾濮�</div>
                                                <div class="txt">鐠愩垹鐦滅粻锛勬倞娑撴艾濮�</div>
                                            </div>
                                        </div>
                                        <div class="box-2">
                                            <div class="box2-title">娣団剝澧�</div>
                                            <div class="txt-content">
                                                <div class="txt">閺咁喗鍎柌鎴ｇ€洪妴渚€鏆辩粔鐔峰彆鐎碉拷</div>
                                                <div class="txt">閸ユ垝绱掑ǎ閿嬫暭閵嗕胶顫嗛崟鐔诲亗閺夛拷</div>
                                                <div class="txt">鐠у嫪楠囩拠浣稿煖閸栵拷</div>
                                                <div class="txt">鐎硅埖妫屾穱鈩冨</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li @click="bankClick('zx')">
                                    <div class="ease-out"></div>
                                    <div class="ease-in">
                                        <div class="box-1">
                                            <div class="title">
                                                <img src="../assets/imgs/home/jx-zx.png"/>
                                            </div>
                                            <div class="txt-content">
                                                <div class="txt">闁叉垼鐎�+閸溿劏顕�</div>
                                                <div class="txt">PPP閸溿劏顕�</div>
                                                <div class="txt">閸忋劏绻冪粙瀣紣缁嬪鎸╃拠锟�</div>
                                            </div>
                                        </div>
                                        <div class="box-2">
                                            <div class="box2-title">閸溿劏顕�</div>
                                            <div class="txt-content">
                                                <div class="txt">閸忋劍绁︾粙瀣紣缁嬪鎸╃拠锟�</div>
                                                <div class="txt">PPP閸溿劏顕�</div>
                                                <div class="txt">瀹搞儳鈻奸惄鎴犳倞 閹锋稒鐖ｆ禒锝囨倞</div>
                                                <div class="txt">閹村灝婀存禍褋鈧浇绁禍褑鐦庢导锟� 鐠у嫪淇婄拠鍕獓</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="閸忔湹绮崥鍫滅稊娴兼瑤鍗�"
                                 name="second">
                        <div class="company auto">
                            <ul>
                                <li @click="partnerClick('01')">
                                    <img src="../assets/partner_01_active.png"/>
                                    <div class="company-name">娑擃厼娴楅懞鍌濆厴閸楀繋绱�</div>
                                </li>
                                <li @click="partnerClick('02')">
                                    <img src="../assets/partner_02_active.png"/>
                                    <div class="company-name">閸栨ぞ鍚禍褎娼堟禍銈嗘閹碘偓</div>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!--濞村繗顫嶉崳銊︽暜閹镐線鍎撮崚锟�-->
        <div class="support">
            <div class="sup-pagination auto">
                <div class="sup-item sup-left">
                    <div class="title">濞村繗顫嶉崳銊︽暜閹革拷</div>
                    <ul>
                        <li>
                            <img class="left-img"
                                 src="../assets/imgs/home/IE.png"/>
                            <span class="left-txt">Internet Explore 10+</span>
                        </li>
                        <li>
                            <img class="left-img"
                                 src="../assets/imgs/home/sll.png"/>
                            <span class="left-txt">360閺嬩線鈧喐绁荤憴鍫濇珤</span>
                        </li>
                        <li>
                            <img class="left-img"
                                 src="../assets/imgs/home/firefox.png"/>
                            <span class="left-txt">Firefox 閻忣偆瀚勫ù蹇氼潔閸ｏ拷</span>
                        </li>
                        <li>
                            <img class="left-img"
                                 src="../assets/imgs/home/chrome.png"/>
                            <span class="left-txt">Google Chrome鐠嬮攱鐡曞ù蹇氼潔閸ｏ拷</span>
                        </li>
                    </ul>
                </div>
                <div class="sup-item sup-center">
                    <div class="title">閸忚櫕鏁為幋鎴滄粦</div>
                    <div class="center-txt">
                        <p class="ct">閹存垳婊戠拠姘跺€嬬拠姘繆娴间椒绗熼崝鐘插弳閿涘矁顔€閹劎娈戞导妯垮窛閺堝秴濮�</p>
                        <p class="ct">閺囨潙銈介崷鐗堟箛閸斺€茬艾鐎圭偘缍嬬紒蹇旂ス閿涘本婀囬崝鈥茬艾缁€鍙ョ窗閿涳拷</p>
                    </div>
                    <div class="center-bottom">
                        <p class="cb">閼辨梻閮撮悽浣冪樈閿涳拷0592-2155195</p>
                        <p class="cb">閻㈤潧鐡欓柇顔绘閿涙ant.zh@ccb.com</p>
                    </div>
                </div>
                <div class="sup-item sup-right">
                    <div class="title right-txt">閹殿偆鐖滄稉瀣祰閳ユ粌缂撻摶宥嗘閸氬牃鈧槐PP</div>
                    <div class="right-img">
                        <!-- <img src="../assets/imgs/home/towCode-1.png" /> -->
                        <img src="../assets/imgs/home/jrzh-app.jpg"
                             width="173"
                             height="173"/>
                    </div>
                </div>
            </div>
        </div>
        <!--閹剚璇炴笟褎鐖�-->
        <essp-right-item></essp-right-item>
        <!--鎼存洟鍎�-->
        <!--<essp-main-footer></essp-main-footer>-->

        <el-dialog custom-class="video-dialog"
                   :visible.sync="showingGuideVideo"
                   :show-close="false"
                   :lock-scroll="true"
                   :append-to-body="true">
            <div class="banner-img">
                <video class="video-content"
                       :src="video.videoSrc"
                       :poster="video.videoImg"
                       :autoplay="video.playStatus"
                       :loop="video.loop"
                       controls>
                    your browser does not support the video tag
                </video>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import EsspHead from "@/components/EsspHead";
    import EsspMainFooter from "@/components/EsspMainFooter";
    import {apiUrl} from "@/fetch/apiUrl.js";
    import EsspNumEffect from "@/components/EsspNumEffect";
    import EsspRightItem from "@/components/EsspRightItem";

    export default {
        name: "",
        components: {
            EsspHead,
            EsspMainFooter,
            EsspNumEffect,
            EsspRightItem
        },
        props: ["sendTo"],
        data() {
            return {
                bgc: "#ffffff ",
                rep: "center center no-repeat",

                showingGuideVideo: false,
                video: {
                    videoSrc: "http://want.ccb.com/essp/upload/advert/楠炲啿褰存禒瀣矝.mp4",
                    videoImg: "",
                    playStatus: "autoplay",
                    loop: true
                },
                infoList: [],
                // 閳ユ棃娓跺Ч鍌濐潡閼规彃鍨介弬锟�-閸ュ墽澧�
                codeMap: {
                    "01": require("../assets/imgs/requimgs/provider.png"),
                    "02": require("../assets/imgs/requimgs/demander.png"),
                    "03": require("../assets/imgs/requimgs/buyer.png"),
                    "04": require("../assets/imgs/requimgs/seller.png"),
                    "05": require("../assets/imgs/requimgs/society.png"),
                    "06": require("../assets/imgs/requimgs/govren.png"),
                    "07": require("../assets/imgs/requimgs/tenant.png"),
                    "08": require("../assets/imgs/requimgs/rent.png"),
                    "09": require("../assets/imgs/requimgs/financing.png"),
                    "10": require("../assets/imgs/requimgs/investor.png"),
                    "11": require("../assets/imgs/requimgs/financing.png"),
                    "12": require("../assets/imgs/requimgs/investor.png"),
                    "13": require("../assets/imgs/requimgs/energy_serve.png"),
                    "14": require("../assets/imgs/requimgs/energy_use.png"),
                    "15": require("../assets/imgs/requimgs/recommend.png"),
                    "16": require("../assets/imgs/requimgs/investor.png"),
                    "17": require("../assets/imgs/requimgs/demand.png"),
                    "18": require("../assets/imgs/requimgs/provide.png"),
                    "19": require("../assets/imgs/requimgs/buyer.png"),
                    "20": require("../assets/imgs/requimgs/seller.png"),
                    "21": require("../assets/imgs/requimgs/iPublish.png"),
                    "22": require("../assets/imgs/requimgs/partner.png"),
                    "23": require("../assets/imgs/requimgs/demand.png"),
                    "24": require("../assets/imgs/requimgs/investor.png"),
                    "25": require("../assets/imgs/requimgs/provider.png"),
                    "26": require("../assets/imgs/requimgs/demander.png")
                },
                sliders: [require("../assets/imgs/home/1.png")],

                hotRqmList: [], // -閺堚偓閺備即娓跺Ч锟�
                valueOpt: "cnwav.wav",
                hotPage: 1,
                showBack: false,
                rqmIndex: 1,
                activeName: "first",
                partnerName: "first",
                form: {
                    region1: "",
                    region1: "",
                    region1: ""
                },
                matchType: [],
                searchForm: {
                    serviecTpCd: "",
                    rqmTpCd: [],
                    rqmRole: ""
                },
                rqmTpCdProps: {
                    value: "codeKey",
                    label: "codeName"
                },
                perbsopContents: [],
                userInfo: {},
                isSubscribe: "",
                entAuthFlag: "",
                // sendTo: false,
                indexTmp: 0
            };
        },
        created() {
            //			this.video.videoSrc = this.$apiUrl.home.getVideo + this.video.videoSrc;
            this.getSliders(); // -閼惧嘲褰囨潪顔芥尡閸ワ拷
            this.getMatchType(); // -閼惧嘲褰囬幘顔兼値閸掑棛琚�
            // this.getHotRqm(); // -閼惧嘲褰囬張鈧弬浼存付濮癸拷
            // this.queryPerbsopContent(); //閺屻儴顕楁稉顏呪偓褍瀵查崯鍡樻簚閸愬懎顔愮敮锟�
        },
        watch: {
            sendTo: {
                handler: function (val) {
                    this.scrollHandle();
                },
                deep: true
            }
        },
        computed: {
            // 閹绢喖鎮庨崚鍡欒閺佺増宓佸┃锟�
            serviecTpCdData: function () {
                return this.matchType;
            },
            // 闂団偓濮瑰倻琚崹瀣殶閹诡喗绨�
            rqmTpCdData: function () {
                // 闁插秶鐤嗛棁鈧Ч鍌滆閸拷
                this.searchForm.rqmTpCd = [];
                let serviecTpCd = this.searchForm.serviecTpCd;
                if (!!serviecTpCd) {
                    return this.matchType.filter(o => o.codeKey === serviecTpCd)[0]
                        .children;
                } else {
                    return [];
                }
            },
            // 闂団偓濮瑰倽顫楅懝鍙夋殶閹诡喗绨�
            rqmRoleData: function () {
                // 闁插秶鐤嗙憴鎺曞
                this.searchForm.rqmRole = "";
                let {serviecTpCd, rqmTpCd} = this.searchForm;
                if (!!serviecTpCd && serviecTpCd !== "03") {
                    // 闂堢偤銆嶉惄顔芥尦閸氾拷
                    return this.serviecTpCdData.filter(o => o.codeKey === serviecTpCd)[0]
                        .roleList;
                } else {
                    // 妞ゅ湱娲伴幘顔兼値
                    let data = [];
                    if (rqmTpCd.length > 0) {
                        data = this.rqmTpCdData.filter(
                            o => o.codeKey === rqmTpCd[rqmTpCd.length - 1]
                        )[0].roleList;
                    }
                    return data;
                }
            }
        },
        methods: {
            //娑撴捇顣芥い锟�
            special(url) {
                if (url.indexOf('parkHome') > -1) {
                    this.SSH.delItem('oldParkId')
                    this.SSH.setItem("parkId", this.constants.haParkData.parkId);
                    sessionStorage.setItem("parkId", this.constants.haParkData.parkId);
                    // localStorage.setItem("parkName", this.parkNm);
                    this.SSH.setItem("parkId", this.constants.haParkData.parkId);
                    // this.SSH.setItem("parkFlag", this.constants.haParkData.parkFlag);
                    this.SSH.setItem("bdFlag", false);
                    this.SSH.setItem("parkName", this.constants.haParkData.parkName);
                }
                this.utils.advUrlturn(url)

            },

            partnerClick(type) {
                switch (type) {
                    case "01":
                        window.open("http://www.emca.cn/");
                        break;
                    case "02":
                        window.open("http://www.cbex.com.cn/");
                        break;
                }
            },

            bankClick(type) {
                switch (type) {
                    case "zb":
                        window.open("http://www.ccbcapital.cn/");
                        break;
                    case "zl":
                        window.open("http://www.ccbleasing.com/");
                        break;
                    case "xt":
                        window.open("http://www.ccbtrust.com.cn/");
                        break;
                    case "qh":
                        window.open("http://www.ccbfutures.com/");
                        break;
                    case "cx":
                        window.open("http://www.ccbpi.com.cn/");
                        break;
                    case "zx":
                        window.open("http://www.ccbconsulting.com/");
                        break;
                }
            },

            // 鐠哄疇娴嗛棁鈧Ч鍌濐嚊閹懘銆�  闂団偓鐟曚礁鍘涢崚銈嗘焽閺勵垰鎯侀弰顖滄暏閹撮攱婀版禍鍝勫絺鐢啰娈戦棁鈧Ч锟�
            toDetailrqm(val) {
                let displayUrl = "";
                let usrid = "";
                if (!this.utils.isEmpty(this.userInfo)) {
                    this.$post("/requirement/requirement_other_detail_head", {
                        bsnId: val.bsnRqmId
                    }).then(response => {
                        if (response.resultCode === "CLT000000000" || response.resultCode === "0000000000") {
                            usrid = response.resultData.param.usrid;
                            if (
                                !this.utils.isEmpty(this.userInfo.id) &&
                                !this.utils.isEmpty(usrid)
                            ) {
                                if (this.userInfo.id == usrid) {
                                    displayUrl = "/requIndex/display-own";
                                } else {
                                    displayUrl = "/requIndex/display-other";
                                }
                                //閺嶅洨顒锋い鍨ⅵ瀵偓妞ょ敻娼�
                                let routerData = this.$router.resolve({
                                    path: displayUrl,
                                    query: {
                                        bsnRqmId: val.bsnRqmId,
                                        tplId: val.tplId
                                    }
                                });
                                window.open(routerData.href, "_blank");
                            } else {
                                displayUrl = "/requIndex/display-other";
                                //閺嶅洨顒锋い鍨ⅵ瀵偓妞ょ敻娼�
                                let routerData = this.$router.resolve({
                                    path: displayUrl,
                                    query: {
                                        bsnRqmId: val.bsnRqmId,
                                        tplId: val.tplId
                                    }
                                });
                                window.open(routerData.href, "_blank");
                            }
                        }
                    });
                } else {
                    displayUrl = "/requIndex/display-other";
                    //閺嶅洨顒锋い鍨ⅵ瀵偓妞ょ敻娼�
                    let routerData = this.$router.resolve({
                        path: displayUrl,
                        query: {
                            bsnRqmId: val.bsnRqmId,
                            tplId: val.tplId
                        }
                    });
                    window.open(routerData.href, "_blank");
                }
            },
            getPath(roleId) {
                let path = this.codeMap[roleId];
                return path;
            },
            getHotRqm() {
                let vm = this;
                if (this.hotPage > 5) {
                    this.hotPage = 1;
                }
                this.$post(this.$apiUrl.home.getHotRqm, {
                    pageNum: this.hotPage
                }).then(response => {
                    vm.hotPage++;
                    vm.hotRqmList = [];
                    let tmpArr = response.resultData;
                    for (let i = 0; i < 5; i++) {
                        vm.hotRqmList.push(tmpArr[i]);
                    }
                });
            },
            goToPerbsop() {
                let userInfo = this.SSH.getItem("userInfo");
                if (!this.utils.isEmpty(userInfo)) {
                    this.$router.push({path: "/personalBusiness/personalBusiness"});
                } else {
                    this.$message({
                        type: "error",
                        message: "閹劏绻曢張顏嗘瑜版洩绱濈拠宄板帥閻ц缍嶉敍锟�"
                    });
                    this.$router.push({path: "/userIndex/login"});
                }
            },
            queryPerbsopContent() {
                let vm = this;
                let userInfo = this.SSH.getItem("userInfo");
                if (userInfo) {
                    vm.userInfo = userInfo;
                    this.$post(this.$apiUrl.user.queryPerbsopContent, {}).then(response => {
                        if (response && response.resultData) {
                            let tmpArr = response.resultData;
                            vm.perbsopContents = [];
                            if (tmpArr.bsopContentList) {
                                vm.perbsopContents = tmpArr.bsopContentList;
                            }
                            if (tmpArr.entAuthFlag) {
                                vm.entAuthFlag = tmpArr.entAuthFlag;
                            }
                            if (tmpArr.isSubscribe || tmpArr.isSubscribe == 0) {
                                vm.isSubscribe = tmpArr.isSubscribe;
                            }
                        }
                    });
                } else {
                    vm.userInfo = userInfo;
                }
            },
            toPerbsopDetail(currentRow) {
                if (currentRow.bsopTypeKey == 1) {
                    //鐠哄疇娴嗛崚浼存付濮瑰倽顕涢幆锟�
                    let displayUrl = "/requIndex/display-other";
                    let routerData = this.$router.resolve({
                        path: displayUrl,
                        query: {bsnRqmId: currentRow.bsnRqmId}
                    });
                    window.open(routerData.href, "_blank");
                } else if (currentRow.bsopTypeKey == 3 || currentRow.bsopTypeKey == 4) {
                    //鐠哄疇娴嗛崚棰佺磼娑撴俺顕涢幆锟�
                    let routerData = this.$router.resolve({
                        path: "/centerIndex/showHome",
                        query: {cstId: currentRow.cstId}
                    });
                    window.open(routerData.href, "_blank");
                } else if (currentRow.bsopTypeKey == 2) {
                    //鐠哄疇娴嗛崚鎷岀カ濠ф劖鐫滄导浣风瑹妞ょ敻娼�
                    this.SSH.setItem("companyDetailflag", 2);
                    let routerData = this.$router.resolve({
                        path: "/requIndex/companyDetail",
                        query: {
                            cstId: currentRow.cstId,
                            mySucssCount: currentRow.mySucssCount,
                            rqmCount: currentRow.rqmCount,
                            cooperativeFlag: currentRow.cooperativeFlag,
                            approveDate: currentRow.approveDate
                        }
                    });
                    window.open(routerData.href, "_blank");
                }
            },
            getSliders() {
                let vm = this;
                this.$post(this.$apiUrl.home.getSliders, {
                    advChannel: "PC",
                    advPos: "01"
                }).then(response => {
                    vm.sliders = [];
                    let list = response.resultData;
                    if (list.length >= 5) {
                        for (var i = 0; i < 5; i++) {
                            vm.sliders.push(list[i]);
                        }
                    } else {
                        for (var i = 0; i < list.length; i++) {
                            vm.sliders.push(list[i]);
                        }
                    }
                });
            },
            getMatchType() {
                let matchType = this.SSH.getItem("matchType") || [];
                if (matchType.length < 1) {
                    this.$post(this.$apiUrl.index.brngUrl, {}).then(resp => {
                        let data = resp.resultData;
                        this.SSH.setItem("matchType", data);
                        this.matchType = data;
                    });
                } else {
                    this.matchType = matchType;
                }
            },

            rqmTab(ind) {
                this.rqmIndex = ind;
                // if (ind == 2 && this.perbsopContents.length > 0) {
                //   this.scrollBusiness();
                // }
                this.$post(apiUrl.rqmList.getAllInfoUrl, {
                    pageSize: 3,
                    pageNum: 1,
                    pubUserType: 1
                }).then(response => {
                    let data = response.resultData.informationList;
                    this.infoList = data;
                });
            },
            scrollBusiness() {
                //閼惧嘲绶辫ぐ鎾冲<ul>
                var $uList = $(".scroll-box ul");
                var timer = null;
                //鐟欙附鎳滃〒鍛敄鐎规碍妞傞崳锟�
                $uList
                    .hover(
                        function () {
                            clearInterval(timer);
                        },
                        function () {
                            //缁傝绱戦崥顖氬З鐎规碍妞傞崳锟�
                            timer = setInterval(function () {
                                scrollList($uList);
                            }, 1000);
                        }
                    )
                    .trigger("mouseleave"); //閼奉亜濮╃憴锕€褰傜憴锔芥嚋娴滃娆�
                //濠婃艾濮╅崝銊ф暰
                function scrollList(obj) {
                    //閼惧嘲绶辫ぐ鎾冲<li>閻ㄥ嫰鐝惔锟�
                    var scrollHeight = $(".scroll-box ul li:first").height();
                    //濠婃艾濮╅崙杞扮娑擄拷<li>閻ㄥ嫰鐝惔锟�
                    $uList.stop().animate(
                        {
                            marginTop: -scrollHeight
                        },
                        600,
                        function () {
                            //閸斻劎鏁剧紒鎾存将閸氬函绱濈亸鍡楃秼閸擄拷<ul>marginTop缂冾喕璐熼崚婵嗩潗閸婏拷0閻樿埖鈧緤绱濋崘宥呯殺缁楊兛绔存稉锟�<li>閹峰吋甯撮崚鐗堟汞鐏忎勘鈧拷
                            $uList
                                .css({
                                    marginTop: 0
                                })
                                .find("li:first")
                                .appendTo($uList);
                        }
                    );
                }
            },
            infoDetail(id) {
                this.$router.push({
                    path: "/infoDetail",
                    query: {
                        informationId: id
                    }
                });
            },
            goToRqmList() {
                this.$router.push({
                    name: "requ-requRqmlist",
                    params: {data: this.searchForm}
                });
            },
            redirectToRqmList(serviecTpCd, rqmTpCd) {
                this.searchForm.serviecTpCd = serviecTpCd;
                this.searchForm.rqmTpCd = rqmTpCd;
                this.$router.push({
                    name: "requ-requRqmlist",
                    params: {data: this.searchForm}
                });
            },
            scrollHandle() {
                let scorllTop =
                    window.pageYOffset ||
                    document.documentElement.scorllTop ||
                    document.body.scorllTop;
                if (scorllTop > 538) {
                    this.showBack = true;
                } else {
                    this.showBack = false;
                }
                if (this.sendTo && this.indexTmp == 0) {
                    this.indexTmp++;
                    this.getHotRqm(); // -閼惧嘲褰囬張鈧弬浼存付濮癸拷
                    // this.queryPerbsopContent(); //閺屻儴顕楁稉顏呪偓褍瀵查崯鍡樻簚閸愬懎顔�
                }
                // let windowHeight=$(window).height();
                // if(scrollTop+windowHeight>=lineHeight){
                //     this.getHotRqm(); // -閼惧嘲褰囬張鈧弬浼存付濮癸拷
                //     this.queryPerbsopContent(); //閺屻儴顕楁稉顏呪偓褍瀵查崯鍡樻簚閸愬懎顔�
                // }
            },
            setSendTo(value) {
                this.sendTo = value;
            },
            toTop() {
                // - 閸ョ偛鍩屽⿰姘З妞ゅ爼鍎�
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
            hoverHandle(event) {
                let targetId = event.target.id;
                if (!targetId) {
                    return;
                } else {
                    targetId = targetId.substring(4);
                    this.activeName = targetId;
                }
            }
        },
        mounted() {
            window.addEventListener("scroll", this.scrollHandle);
            $(".is-left").on("mouseover", this.hoverHandle);
        },
        destroyed: function () {
            window.removeEventListener("scroll", this.scrollHandle);
            $(".is-left").off("mouseover", this.hoverHandle);
        }
    };
</script>
<style lang="less">
    .video-dialog {
        background-color: transparent !important;
        display: flex;
        justify-content: center;
        border: none;
        .el-dialog__header {
            padding: 0 !important;
        }
        .el-dialog__body {
            padding: 0 !important;
        }
        .video-content {
            width: 100%;
            height: 100%;
            object-fit: fill;
            border: 10px solid #ffffff;
        }
    }
</style>

<style lang="less" scoped>
    @import "../assets/css/mixin";
    // -ele娑撳鏁弽宄扮础
    .searchForm {
        margin-top: 26px;
    }

    .banner {
        position: relative;
        .banner-img {
            position: relative;
            width: 100%;
            height: 538px;
            z-index: 1;
            overflow: hidden;
            margin: 0 auto;
            min-width: 1200px;
        }
        .banner-pagination {
            width: 100%;
            position: absolute;
            bottom: -50px;
            left: 0;
            z-index: 2;
            height: 110px;
            text-align: center;
            .pag-content {
                border-radius: 6px;
                display: inline-block;
                background: #ffffff;
                box-shadow: 0 14px 50px -8px rgba(0, 0, 0, 0.12);
                height: 100%;
                .txt {
                    padding-left: 34px;
                    text-align: left;
                    .txt-1 {
                        color: #000000;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .txt-2 {
                        color: #666666;
                        font-size: 14px;
                        padding-top: 5px;
                    }
                }
            }
        }
    }

    .intro {
        position: relative;
        width: 100%;
        height: 785px;
        background: url(../assets/imgs/home/bgInsto.png) center center no-repeat;
        .intro-pagination {
            position: relative;
            margin: 0 auto;
            height: 100%;
            .intro-title-box {
                width: 100%;
                text-align: center;
                .title {
                    font-size: 26px;
                    color: #333333;
                    padding-top: 170px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                }
                .title:after {
                    position: absolute;
                    top: 268px;
                    left: 50%;
                    margin-left: -8px;
                    width: 20px;
                    height: 4px;
                    background: #26a4fa;
                    content: "";
                }
                .title-des {
                    margin-top: 10px;
                    font-size: 18px;
                    color: #666666;
                }
            }
            .intro-content {
                position: absolute;
                top: 348px;
                left: -1px;
                z-index: 2;
                width: 100%;
                height: 360px;
                /*border: 1px solid #f1f1f1;
                          background: red;*/
                li {
                    position: relative;
                    float: left;
                    width: 300px;
                    height: 319px;
                    text-align: center;
                    .li-img {
                        width: 300px;
                        height: 160px;
                        img {
                            width: 65%;
                            height: 100%;
                        }
                    }
                    .li-ch-title {
                        margin-top: 16px;
                        font-size: 18px;
                        color: #666666;
                    }
                    .li-sub-title {
                        margin: 10px 0 42px 0;
                        .sub {
                            font-size: 14px;
                            padding-top: 10px;
                            color: #999999;
                        }
                    }
                    .li-sub-title:after {
                        position: absolute;
                        bottom: 20px;
                        left: 49%;
                        margin-left: -8px;
                        width: 20px;
                        height: 4px;
                        background: #26a4fa;
                        content: "";
                    }
                    .li-bot-title {
                        padding-top: 10px;
                        font-size: 14px;
                        color: #999999;
                    }
                }
            }
        }
    }

    .classify {
        position: relative;
        width: 100%;
        height: 756px;
        background: url(../assets/imgs/home/bgClassify.png) center center no-repeat;
        .classify-top {
            .intro-title-box {
                width: 100%;
                text-align: center;
                .title {
                    font-size: 26px;
                    color: #ffffff;
                    padding-top: 52px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                }
                .title:after {
                    position: absolute;
                    top: 110px;
                    left: 50%;
                    margin-left: -8px;
                    width: 20px;
                    height: 4px;
                    background: #26a4fa;
                    content: "";
                }
            }
        }
        .classify-bottom {
            padding: 0 44px;
            margin-top: 34px;
            .tab-content {
                margin-top: 46px;
                margin-left: 120px;
                .tab-title {
                    font-size: 26px;
                    color: #ffffff;
                }
                .tab-body {
                    font-size: 16px;
                    color: #ffffff;
                    margin-top: 55px;
                    letter-spacing: 1px;
                    line-height: 34px;
                }
                .tab-btn {
                    margin-top: 68px;
                }
            }
        }
    }

    .advan {
        position: relative;
        width: 100%;
        height: 767px;
        background: url(../assets/imgs/home/bgAdvan.png) no-repeat;
        -webkit-background-size: 100%;
        .advan-pagination {
            position: relative;
            margin: 0 auto;
            height: 100%;
            .intro-title-box {
                width: 100%;
                text-align: center;
                .title {
                    font-size: 26px;
                    color: #333333;
                    padding-top: 64px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    font-weight: bold;
                }
                .title:after {
                    position: absolute;
                    top: 155px;
                    left: 50%;
                    margin-left: -8px;
                    width: 20px;
                    height: 4px;
                    background: #26a4fa;
                    content: "";
                }
                .title-des {
                    margin-top: 10px;
                    font-size: 18px;
                    color: #666666;
                }
            }
            .advan-accout {
                width: 100%;
                margin-top: 86px;
                //text-align-last: center;
                .account-num {
                    width: 80%;
                    margin: 0 auto;
                    text-align: center;
                    //display: inline-block;
                    .num {
                        font-style: italic;
                        font-size: 64px;
                        color: #26a4fa;
                        font-family: PingFangSC-Regular;
                    }
                    .num-intro {
                        margin-top: 10px;
                        font-size: 16px;
                        color: #666666;
                    }
                }
            }
            .advan-detail {
                width: 100%;
                position: absolute;
                top: 372px;
                left: 0;
                z-index: 2;
                height: 580px;
                text-align: center;
                .detail-content {
                    display: inline-block;
                    background: #ffffff;
                    box-shadow: 0 14px 50px -8px rgba(0, 0, 0, 0.12);
                    height: 100%;
                    border-radius: 6px;
                    .main-img {
                        margin: 40px auto;
                        width: 965px;
                        .advan-txt {
                            margin-top: 20px;
                            p {
                                font-size: 14px;
                                color: #c5c5c5;
                                letter-spacing: 1px;
                            }
                        }
                    }
                    #serve-img-area.paused .point-area .point-10:after {
                        animation-play-state: paused;
                        -webkit-animation-play-state: paused;
                        /* Safari 闁告粣鎷� Chrome */
                    }
                    #serve-img-area.paused .point-area .point-20:after {
                        animation-play-state: paused;
                        -webkit-animation-play-state: paused;
                        /* Safari 闁告粣鎷� Chrome */
                    }
                    #serve-img-area.paused .point-area .point-30:after {
                        animation-play-state: paused;
                        -webkit-animation-play-state: paused;
                        /* Safari 闁告粣鎷� Chrome */
                    }
                    #serve-img-area.paused .point-area .point-40:after {
                        animation-play-state: paused;
                        -webkit-animation-play-state: paused;
                        /* Safari 闁告粣鎷� Chrome */
                    }
                    #serve-img-area.paused .point-area .point-50:after {
                        animation-play-state: paused;
                        -webkit-animation-play-state: paused;
                        /* Safari 闁告粣鎷� Chrome */
                    }
                    #serve-img-area.paused .point-area .point-60:after {
                        animation-play-state: paused;
                        -webkit-animation-play-state: paused;
                        /* Safari 闁告粣鎷� Chrome */
                    }
                    #serve-img-area.paused .point-area .point-70:after {
                        animation-play-state: paused;
                        -webkit-animation-play-state: paused;
                        /* Safari 闁告粣鎷� Chrome */
                    }
                    #serve-img-area.paused .point-area .point-80:after {
                        animation-play-state: paused;
                        -webkit-animation-play-state: paused;
                        /* Safari 闁告粣鎷� Chrome */
                    }
                    #serve-img-area.paused .point-area .point-90:after {
                        animation-play-state: paused;
                        -webkit-animation-play-state: paused;
                        /* Safari 闁告粣鎷� Chrome */
                    }
                    #serve-img-area.paused .point-area .point-100:after {
                        animation-play-state: paused;
                        -webkit-animation-play-state: paused;
                        /* Safari 闁告粣鎷� Chrome */
                    }
                    #serve-img-area .point-area {
                        text-align: center;
                        position: relative;
                        width: 150px;
                        height: 150px;
                        -webkit-transition: opacity 0.5s ease-out;
                        -moz-transition: opacity 0.5s ease-out;
                        -o-transition: opacity 0.5s ease-out;
                        transition: opacity 0.5s ease-out;
                    }
                    #serve-img-area .point-area .point {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 10px;
                        height: 10px;
                        margin: auto;
                        -webkit-border-radius: 50%;
                        -webkit-background-clip: padding-box;
                        -moz-border-radius: 50%;
                        -moz-background-clip: padding;
                        border-radius: 50%;
                        background-clip: padding-box;
                        background: transparent;
                    }
                    #serve-img-area .point-area .point-shadow:after {
                        -webkit-box-shadow: inset 0 0 5em rgba(0, 205, 236, 0.16);
                        -moz-box-shadow: inset 0 0 5em rgba(0, 205, 236, 0.16);
                        box-shadow: inset 0 0 5em rgba(0, 205, 236, 0.16);
                    }
                    #serve-img-area .point-area .point-white {
                        background-color: #fff;
                        border: 1px solid #00c1de;
                    }
                    #serve-img-area .point-area .point-dot {
                        z-index: 1;
                        background-color: #6ad7e9;
                        border: 1px solid rgba(0, 205, 236, 0.37);
                    }
                    #serve-img-area .point-area .point-10 {
                        width: 100%;
                        height: 100%;
                    }
                    #serve-img-area .point-area .point-10:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 50%;
                        border: 2px solid #0091d8;
                        opacity: 0;
                        -webkit-animation: ripple 4500ms ease-out 225ms infinite;
                        -moz-animation: ripple 4500ms ease-out 225ms infinite;
                        -o-animation: ripple 4500ms ease-out 225ms infinite;
                        animation: ripple 4500ms ease-out 225ms infinite;
                    }
                    #serve-img-area .point-area .point-20 {
                        width: 100%;
                        height: 100%;
                    }
                    #serve-img-area .point-area .point-20:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 50%;
                        border: 2px solid #0091d8;
                        opacity: 0;
                        -webkit-animation: ripple 4500ms ease-out 450ms infinite;
                        -moz-animation: ripple 4500ms ease-out 450ms infinite;
                        -o-animation: ripple 4500ms ease-out 450ms infinite;
                        animation: ripple 4500ms ease-out 450ms infinite;
                    }
                    #serve-img-area .point-area .point-30 {
                        width: 100%;
                        height: 100%;
                    }
                    #serve-img-area .point-area .point-30:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 50%;
                        border: 2px solid #0091d8;
                        opacity: 0;
                        -webkit-animation: ripple 4500ms ease-out 675ms infinite;
                        -moz-animation: ripple 4500ms ease-out 675ms infinite;
                        -o-animation: ripple 4500ms ease-out 675ms infinite;
                        animation: ripple 4500ms ease-out 675ms infinite;
                    }
                    #serve-img-area .point-area .point-40 {
                        width: 100%;
                        height: 100%;
                    }
                    #serve-img-area .point-area .point-40:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 50%;
                        border: 2px solid #0091d8;
                        opacity: 0;
                        -webkit-animation: ripple 4500ms ease-out 900ms infinite;
                        -moz-animation: ripple 4500ms ease-out 900ms infinite;
                        -o-animation: ripple 4500ms ease-out 900ms infinite;
                        animation: ripple 4500ms ease-out 900ms infinite;
                    }
                    #serve-img-area .point-area .point-50 {
                        width: 100%;
                        height: 100%;
                    }
                    #serve-img-area .point-area .point-50:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 50%;
                        border: 2px solid #0091d8;
                        opacity: 0;
                        -webkit-animation: ripple 4500ms ease-out 1125ms infinite;
                        -moz-animation: ripple 4500ms ease-out 1125ms infinite;
                        -o-animation: ripple 4500ms ease-out 1125ms infinite;
                        animation: ripple 4500ms ease-out 1125ms infinite;
                    }
                    #serve-img-area .point-area .point-60 {
                        width: 100%;
                        height: 100%;
                    }
                    #serve-img-area .point-area .point-60:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 50%;
                        border: 2px solid #0091d8;
                        opacity: 0;
                        -webkit-animation: ripple 4500ms ease-out 1350ms infinite;
                        -moz-animation: ripple 4500ms ease-out 1350ms infinite;
                        -o-animation: ripple 4500ms ease-out 1350ms infinite;
                        animation: ripple 4500ms ease-out 1350ms infinite;
                    }
                    #serve-img-area .point-area .point-70 {
                        width: 100%;
                        height: 100%;
                    }
                    #serve-img-area .point-area .point-70:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 50%;
                        border: 2px solid #0091d8;
                        opacity: 0;
                        -webkit-animation: ripple 4500ms ease-out 1575ms infinite;
                        -moz-animation: ripple 4500ms ease-out 1575ms infinite;
                        -o-animation: ripple 4500ms ease-out 1575ms infinite;
                        animation: ripple 4500ms ease-out 1575ms infinite;
                    }
                    #serve-img-area .point-area .point-80 {
                        width: 100%;
                        height: 100%;
                    }
                    #serve-img-area .point-area .point-80:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 50%;
                        border: 2px solid #0091d8;
                        opacity: 0;
                        -webkit-animation: ripple 4500ms ease-out 1800ms infinite;
                        -moz-animation: ripple 4500ms ease-out 1800ms infinite;
                        -o-animation: ripple 4500ms ease-out 1800ms infinite;
                        animation: ripple 4500ms ease-out 1800ms infinite;
                    }
                    #serve-img-area .point-area .point-90 {
                        width: 100%;
                        height: 100%;
                    }
                    #serve-img-area .point-area .point-90:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 50%;
                        border: 2px solid #0091d8;
                        opacity: 0;
                        -webkit-animation: ripple 4500ms ease-out 2025ms infinite;
                        -moz-animation: ripple 4500ms ease-out 2025ms infinite;
                        -o-animation: ripple 4500ms ease-out 2025ms infinite;
                        animation: ripple 4500ms ease-out 2025ms infinite;
                    }
                    #serve-img-area .point-area .point-100 {
                        width: 100%;
                        height: 100%;
                    }
                    #serve-img-area .point-area .point-100:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        border-radius: 50%;
                        border: 2px solid #0091d8;
                        opacity: 0;
                        -webkit-animation: ripple 4500ms ease-out 2250ms infinite;
                        -moz-animation: ripple 4500ms ease-out 2250ms infinite;
                        -o-animation: ripple 4500ms ease-out 2250ms infinite;
                        animation: ripple 4500ms ease-out 2250ms infinite;
                    }
                    @-webkit-keyframes ripple {
                        0% {
                            opacity: 0;
                            -webkit-transform: scale(0.1, 0.1);
                        }
                        5% {
                            opacity: 1;
                        }
                        100% {
                            opacity: 0;
                            -webkit-transform: scale(1);
                        }
                    }
                    @-moz-keyframes ripple {
                        0% {
                            opacity: 0;
                            -moz-transform: scale(0.1, 0.1);
                        }
                        5% {
                            opacity: 1;
                        }
                        100% {
                            opacity: 0;
                            -moz-transform: scale(1);
                        }
                    }
                    @-o-keyframes ripple {
                        0% {
                            opacity: 0;
                            -o-transform: scale(0.1, 0.1);
                        }
                        5% {
                            opacity: 1;
                        }
                        100% {
                            opacity: 0;
                            -o-transform: scale(1);
                        }
                    }
                    @keyframes ripple {
                        0% {
                            opacity: 0;
                            -webkit-transform: scale(0.1, 0.1);
                            -moz-transform: scale(0.1, 0.1);
                            -ms-transform: scale(0.1, 0.1);
                            transform: scale(0.1, 0.1);
                        }
                        5% {
                            opacity: 1;
                        }
                        100% {
                            opacity: 0;
                            -webkit-transform: scale(1);
                            -moz-transform: scale(1);
                            -ms-transform: scale(1);
                            transform: scale(1);
                        }
                    }
                }
            }
        }
    }

    .rqm {
        width: 100%;
        position: relative;
        height: 924px;
        background: url(../assets/imgs/home/bgRqm.png) no-repeat;
        -webkit-background-size: 100%;
        .rqm-title {
            text-align: center;
            width: 100%;
            font-size: 26px;
            color: #333333;
            padding-top: 260px;
        }
        .rqm-pagination {
            position: relative;
            text-align: center;
            .rqm-item {
                display: inline-block;
                font-size: 20px;
                color: #666666;
                margin-top: 26px;
                cursor: pointer;
            }
            .left {
                padding-right: 16px;
            }
            .right {
                padding-left: 20px;
                border-left: 1px solid #666666;
            }
            .active {
                color: #26a4fa;
            }
            .rqm-detail {
                margin-top: 48px;
                .news-1 {
                    position: relative;
                    float: left;
                    width: 384px;
                    text-align: center;
                    cursor: pointer;
                    margin-left: 16px;
                    .item-box {
                        width: 100%;
                        box-shadow: 0 14px 50px -8px rgba(0, 0, 0, 0.12);
                        img {
                            width: 100%;
                            height: 232px;
                        }
                        .box-title {
                            font-size: 18px;
                            color: #666666;
                            padding: 23px 37px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .item-bottom {
                        padding-left: 18px;
                        padding-right: 37px;
                        .bottom-txt {
                            font-size: 16px;
                            color: #888888;
                            text-align: left;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .bt1 {
                            margin-top: 30px;
                        }
                        .bt2 {
                            margin-top: 16px;
                        }
                    }
                }
                .news-2 {
                    margin-bottom: 18px;
                    text-align: left;
                    width: 100%;
                    border-bottom: 1px solid #e4e4e4;
                    .rqm-top {
                        width: 100%;
                        .top-img {
                            float: left;
                            margin-top: 2px;
                        }
                        .top-txt {
                            margin-left: 9px;
                            font-size: 20px;
                            line-height: 24px;
                            color: #000000;
                        }
                        .top-right {
                            float: right;
                            font-size: 14px;
                            color: #999999;
                            .top-right-content {
                                float: left;
                                img {
                                    float: left;
                                    margin-top: 2px;
                                }
                                .right-center {
                                    margin: 0 10px;
                                }
                            }
                        }
                    }
                    .rqm-bottom {
                        margin: 13px 0 18px 0;
                        width: 100%;
                        .bottom-item {
                            display: inline-block;
                            font-size: 16px;
                            color: #888888;
                            .item-num {
                                display: inline-block;
                                margin-left: 22px;
                                .num-img {
                                    float: left;
                                    margin-top: 2px;
                                }
                                .num-txt {
                                    margin-left: 8px;
                                }
                            }
                        }
                        .mag-1 {
                            margin-left: 54px;
                        }
                        .mag-2 {
                            margin-left: 26px;
                        }
                    }
                }
                .refresh {
                    position: relative;
                    margin-top: 26px;
                    .ref-content {
                        display: inline-block;
                        .ref-img {
                            float: left;
                            margin-top: 2px;
                        }
                        .ref-txt {
                            margin-left: 6px;
                            font-size: 16px;
                            color: #999999;
                            cursor: pointer;
                        }
                    }
                }
            }
            .scroll-box {
                width: 1200px;
                height: 500px;
                margin: 20px auto;
                overflow: hidden;
                ul {
                    list-style: none;
                    width: 100%;
                    height: 100%;
                    li {
                        height: 40px;
                        line-height: 40px;
                        span {
                            // font-family: PingFangSC-Light;
                            font-size: 18px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 20px;
                            letter-spacing: 0px;
                            color: #333333;
                        }
                        .perbsop-arrow {
                            width: 20px;
                            display: inline-block;
                            vertical-align: sub;
                            margin-left: 60px;
                            height: 20px;
                            background: url("../assets/imgs/home/perbsop-arrow.png");
                            // background-color: #ffffff;
                        }
                    }
                    li:hover {
                        // color:#ff0000;
                        height: 40px;
                        line-height: 40px;
                        background-color: #0e9dff;
                        width: 1100px;
                        margin: 0 auto;
                        box-shadow: 0px 8px 19.8px 0.2px rgba(0, 0, 0, 0.12);
                        span {
                            // font-family: PingFangSC-Light;
                            font-size: 18px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 20px;
                            letter-spacing: 0px;
                            color: #ffffff;
                        }
                    }
                }
                .notice {
                    .notice-content {
                        margin-top: 66px;
                        .notice-img {
                            width: 260px;
                            height: 197px;
                            margin: 0 auto;
                            background: url("../assets/imgs/home/per-bus.png");
                        }
                        .notice-p1 {
                            font-size: 20px;
                            color: #2374fe;
                            margin-top: 40px;
                        }
                        .notice-p2 {
                            font-size: 16px;
                            letter-spacing: 0.4px;
                            color: #999999;
                            margin-top: 16px;
                        }
                        .btn {
                            width: 140px !important;
                            height: 38px !important;
                            margin-top: 57px;
                        }
                    }
                    .no-content-notice {
                        margin-top: 66px;
                        .no-content-img {
                            width: 246px;
                            height: 164px;
                            margin: 0 auto;
                            background-repeat: no-repeat;
                            background: url("../assets/imgs/home/no-content-notice.png");
                        }
                        .no-content-p {
                            font-size: 16px;
                            letter-spacing: 0.4px;
                            color: #999999;
                            text-align: center;
                            margin-top: 16px;
                        }
                    }
                }
            }
        }
    }

    .partner {
        width: 100%;
        height: 660px;
        background: #f7f7f7;
        position: relative;
        .partner-title {
            text-align: center;
            width: 100%;
            font-size: 26px;
            color: #333333;
            padding-top: 48px;
        }
        .partner-title:before {
            position: absolute;
            top: 68px;
            margin-left: -24px;
            width: 13px;
            height: 2px;
            background: #333333;
            content: "";
        }
        .partner-title:after {
            position: absolute;
            top: 68px;
            margin-left: 12px;
            width: 13px;
            height: 2px;
            background: #333333;
            content: "";
        }
        .partner-pagination {
            margin-top: 56px;
        }
        .bank {
            width: 1320px;
            z-index: 5;
            li {
                cursor: pointer;
                float: left;
                width: 220px;
                height: 250px;
                background: url(../assets/imgs/home/bankModel.png) no-repeat;
                background-size: 100%;
                margin-bottom: -10px;
                .ease-out {
                    z-index: 10;
                    width: 100%;
                    height: 22%;
                    position: relative;
                    background: url(../assets/imgs/home/bankModel-1.png) no-repeat;
                    background-size: 100%;
                }
                .ease-in {
                    z-index: 3;
                    width: 70%;
                    height: 84%;
                    position: relative;
                    top: 0;
                    left: 32px;
                    display: inline-block;
                    text-align: center;
                    transition: all 0.2s ease-in;
                    -webkit-transition: all 0.2s ease-in;
                    .box-1 {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        display: inline-block;
                        text-align: center;
                        .title {
                            margin-top: 6px;
                        }
                        .txt-content {
                            margin-top: 30px;
                            .txt {
                                font-size: 14px;
                                color: #333333;
                                line-height: 26px;
                            }
                        }
                        .title:after {
                            position: absolute;
                            top: 68px;
                            left: 50%;
                            margin-left: -8px;
                            width: 16px;
                            height: 2px;
                            background: #005bac;
                            content: "";
                        }
                    }
                    .box-2 {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        display: inline-block;
                        text-align: center;
                        .box2-title {
                            letter-spacing: 1px;
                            font-size: 16px;
                            color: #287cc7;
                            line-height: 40px;
                        }
                        .box2-title:before {
                            position: absolute;
                            top: 19px;
                            left: 28px;
                            margin-left: -8px;
                            width: 24px;
                            height: 1px;
                            background: #d6d6d6;
                            content: "";
                        }
                        .box2-title:after {
                            position: absolute;
                            top: 19px;
                            left: 114px;
                            margin-left: -8px;
                            width: 24px;
                            height: 1px;
                            background: #d6d6d6;
                            content: "";
                        }
                        .txt-content {
                            margin-top: 4px;
                            .txt {
                                font-size: 12px;
                                color: #666666;
                                line-height: 26px;
                            }
                        }
                        .txt-content:after {
                            position: absolute;
                            top: 164px;
                            left: 50%;
                            margin-left: -8px;
                            width: 22px;
                            height: 3px;
                            background: #005bac;
                            content: "";
                        }
                    }
                }
                .ease-in:hover {
                    margin-top: -212px;
                }
            }
        }
        .company {
            ul {
                li {
                    cursor: pointer;
                    display: inline-block;
                    margin-left: 20px;
                    .company-name {
                        font-size: 16px;
                        text-align: center;
                    }
                }
            }
        }
    }

    .support {
        width: 100%;
        height: 270px;
        background: #ffffff;
        padding-top: 36px;
        padding-bottom: 30px;
        .sup-pagination {
            width: 1172px;
            height: 100%;
            .sup-item {
                float: left;
                height: 100%;
                .title {
                    font-size: 20px;
                    color: #333333;
                    font-weight: bold;
                    margin-top: 24px;
                }
            }
            .sup-left {
                width: 318px;
                ul {
                    padding-top: 24px;
                    li {
                        margin-top: 18px;
                    }
                }
                .left-img {
                    float: left;
                    width: 18px;
                    height: 18px;
                    margin-top: 2px;
                }
                .left-txt {
                    margin-left: 16px;
                    font-size: 18px;
                    color: #666666;
                }
            }
            .sup-center {
                width: 321px;
                padding-left: 90px;
                padding-right: 70px;
                border-left: 1px solid #e8e8e8;
                border-right: 1px solid #e8e8e8;
                .center-txt {
                    margin-top: 48px;
                    .ct {
                        font-size: 16px;
                        color: #666666;
                        line-height: 28px;
                    }
                }
                .center-bottom {
                    margin-top: 30px;
                    .cb {
                        font-size: 14px;
                        color: #b1b1b1;
                        line-height: 28px;
                    }
                }
            }
            .sup-right {
                width: 370px;
                .right-txt {
                    text-align: center;
                }
                .right-img {
                    text-align: center;
                    margin-top: 40px;
                }
            }
        }
    }

    .sidebar {
        display: block;
        .menu {
            position: fixed;
            right: 3px;
            top: 199px;
            z-index: 99;
            margin-left: 496px;
            width: 60px;
            li {
                position: relative;
                display: block;
                margin-bottom: 2px;
                width: 60px;
                cursor: pointer;
            }
            .back {
                margin-top: 46px;
            }
            .down {
                .down-app {
                    display: none;
                    position: absolute;
                    width: 140px;
                    height: 140px;
                    // height: 185px;
                    right: 66px;
                    cursor: default;
                    top: 0;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .down:hover .down-app {
                display: block;
            }
            .phone {
                .phone-txt {
                    display: none;
                    position: absolute;
                    width: 299px;
                    height: 57px;
                    right: 66px;
                    cursor: default;
                    top: 0;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .phone:hover .phone-txt {
                display: block;
            }
        }
    }

    .smartSer {
        display: block;
        position: fixed;
        right: 3px;
        top: 499px;
        z-index: 99;
        margin-left: 496px;
        width: 80px;
        height: 80px;
    }

    .auto {
        .essp_width_auto();
    }

    .pointer {
        cursor: pointer;
    }

    .notice-content3 {
        margin-top: 66px;

        .notice-p1 {
            font-size: 20px;
            color: #2374fe;
            margin-top: 34px;
        }
        .notice-p2 {
            font-size: 16px;
            letter-spacing: 0.4px;
            color: #999999;
            margin-top: 11px;
        }
        .btn {
            width: 140px !important;
            height: 38px !important;
            margin-top: 57px;
        }
    }
</style>
