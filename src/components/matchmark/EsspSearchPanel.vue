 <template>
  <div>
    <div class="search-container"
         v-if="searchType == '0'">
      <div class="search-choose esspclearfix">
        <el-row class="search-reset">
          <span>筛选条件</span>
          <span class="f-r">
            <el-button type="text"
                       @click="resetSeachOption">重置筛选</el-button>
          </span>
        </el-row>
        <el-form ref="form"
                 :model="searchForm"
                 label-width="85px"
                 size="mini"
                 class="select-content">
          <el-row class="select-wrapper">
            <el-col :span="12">
              <el-form-item label="所属行业：">
                <el-col :span="7">
                  <el-select v-model="searchForm.indLvl1Cd"
                             filterable
                             clearable
                             placeholder="请选择行业"
                             @change="delete searchForm.indLvl2Cd;delete searchForm.indLvl3Cd"
                             class="el-select_input">
                    <el-option v-for="item in dataSoure.RZZL_00017"
                               :key="item.key"
                               :label="item.value"
                               :value="item.key">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="searchForm.indLvl2Cd"
                             filterable
                             clearable
                             placeholder="请选择行业"
                             @change="delete searchForm.indLvl3Cd">
                    <el-option v-for="item in dataSoure.RZZL_00018"
                               :key="item.key"
                               :label="item.value"
                               :value="item.key"
                               v-if="item.key.startsWith(searchForm.indLvl1Cd)">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="searchForm.indLvl3Cd"
                             filterable
                             clearable
                             placeholder="请选择行业">
                    <el-option v-for="item in dataSoure.RZZL_00019"
                               :key="item.key"
                               :label="item.value"
                               :value="item.key"
                               v-if="item.key.startsWith(searchForm.indLvl2Cd)">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="select-wrapper">
            <el-col :span="12">
              <el-form-item label="经营区域：">
                <el-col :span="7">
                  <el-select v-model="searchForm.areaCntyCd"
                             filterable
                             clearable
                             placeholder="国家"
                             v-if="searchForm.areaCntyCd != '-1'"
                             @change="delete searchForm.areaProvCd;">
                    <el-option v-for="item in dataSoure.COM_00004"
                               :key="item.key"
                               :label="item.value"
                               :value="item.key">

                    </el-option>
                  </el-select>
                  <el-select filterable
                             placeholder="国家"
                             v-else
                             @change="delete searchForm.areaProvCd;">
                  </el-select>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="searchForm.areaProvCd"
                             filterable
                             clearable
                             placeholder="省份">
                    <el-option v-for="item in dataSoure.COM_00001"
                               :key="item.key"
                               :label="item.value"
                               :value="item.key"
                               v-if="searchForm.areaCntyCd === '156'">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业所在地："
                            label-width="98px">
                <el-col :span="7">
                  <el-select v-model="searchForm.bngCntyCd"
                             filterable
                             clearable
                             placeholder="国家"
                             @change="delete searchForm.bngProvCd;delete searchForm.bngCityCd;">
                    <el-option v-for="item in dataSoure.COM_00004"
                               :key="item.key"
                               :label="item.value"
                               :value="item.key">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="searchForm.bngProvCd"
                             filterable
                             clearable
                             placeholder="省份"
                             @change="delete searchForm.bngCityCd;">
                    <el-option v-for="item in dataSoure.COM_00001"
                               :key="item.key"
                               :label="item.value"
                               :value="item.key"
                               v-if="searchForm.bngCntyCd === '156'">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="searchForm.bngCityCd"
                             filterable
                             clearable
                             placeholder="城市">
                    <el-option v-for="item in dataSoure.COM_00002"
                               :key="item.key"
                               :label="item.value"
                               :value="item.key"
                               v-if="searchForm.bngProvCd && item.key.startsWith(searchForm.bngProvCd.slice(0,2))">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row class="search-result">
          <span>筛选后的结果</span>
        </el-row>
      </div>
    </div>
    <div class="search-container"
         v-if="searchType == '1'">
      <div class="search-choose">
        <el-row class="search-reset">
          <span>筛选条件</span>
          <span class="f-r">
            <el-button type="text"
                       @click="resetSeachOption">重置筛选</el-button>
          </span>
        </el-row>
        <el-form ref="form"
                 :model="searchForm"
                 label-width="85px"
                 size="mini"
                 class="select-content">
          <el-row class="select-wrapper">
            <el-form-item label="服务分类："
                          class="select-cascader">
              <el-cascader :options="srvTpCdData"
                           :props="rqmTpCdProps"
                           v-model="searchForm.srvTpCd"
                           class="srvTpCd"
                           filterable
                           clearable
                           change-on-select>
              </el-cascader>
            </el-form-item>
          </el-row>
          <el-row class="select-wrapper">
            <el-form-item label="服务区域：">
              <el-col :span="3">
                <el-select v-model="searchForm.areaCntyCd"
                           filterable
                           clearable
                           placeholder="国家"
                           v-if="searchForm.areaCntyCd != '-1'"
                           @change="delete searchForm.areaProvCd;">
                  <el-option v-for="item in dataSoure.COM_00004"
                             :key="item.key"
                             :label="item.value"
                             :value="item.key">

                  </el-option>
                </el-select>
                <el-select filterable
                           placeholder="国家"
                           v-else
                           @change="delete searchForm.areaProvCd;">
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-select v-model="searchForm.areaProvCd"
                           filterable
                           clearable
                           placeholder="省份">
                  <el-option v-for="item in dataSoure.COM_00001"
                             :key="item.key"
                             :label="item.value"
                             :value="item.key"
                             v-if="searchForm.areaCntyCd === '156'">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
        <el-row class="search-result">
          <span>筛选后的结果</span>
        </el-row>
      </div>
    </div>
    <div class="search-container"
         v-if="searchType == '4'">
      <div class="search-choose">
        <el-row class="search-reset">
          <span>筛选条件</span>
          <span class="f-r">
            <el-button type="text"
                       @click="resetSeachOption">重置筛选</el-button>
          </span>
        </el-row>
        <el-form ref="form"
                 :model="searchForm"
                 label-width="85px"
                 size="mini"
                 class="select-content">
          <el-row class="select-wrapper">
            <el-form-item label="商品分类："
                          class="select-cascader">
              <el-cascader :options="prdTpCdData"
                           :props="rqmTpCdProps"
                           v-model="searchForm.srvTpCd"
                           class="srvTpCd"
                           filterable
                           clearable
                           change-on-select>
              </el-cascader>
            </el-form-item>
          </el-row>
          <el-row class="select-wrapper">
            <el-form-item label="供货地区：">
              <el-col :span="3">
                <el-select v-model="searchForm.areaCntyCd"
                           filterable
                           clearable
                           placeholder="国家"
                           v-if="searchForm.areaCntyCd != '-1'"
                           @change="delete searchForm.areaProvCd;">
                  <el-option v-for="item in dataSoure.COM_00004"
                             :key="item.key"
                             :label="item.value"
                             :value="item.key">

                  </el-option>
                </el-select>
                <el-select filterable
                           placeholder="国家"
                           v-else
                           @change="delete searchForm.areaProvCd;">
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-select v-model="searchForm.areaProvCd"
                           filterable
                           clearable
                           placeholder="省份">
                  <el-option v-for="item in dataSoure.COM_00001"
                             :key="item.key"
                             :label="item.value"
                             :value="item.key"
                             v-if="searchForm.areaCntyCd === '156'">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
        <el-row class="search-result">
          <span>筛选后的结果</span>
        </el-row>
      </div>
    </div>
    <div class="search-container"
         v-if="searchType == '2'">
      <div class="search-choose esspclearfix">
        <el-row class="search-reset">
          <span>筛选条件</span>
          <span class="f-r">
            <el-button type="text"
                       @click="resetSeachOption">重置筛选</el-button>
          </span>
        </el-row>
        <el-form ref="form"
                 :model="searchForm"
                 label-width="85px"
                 size="mini"
                 class="select-content">
          <el-row class="select-wrapper">
            <el-form-item label="服务区域：">
              <el-col :span="3">
                <el-select v-model="searchForm.areaCntyCd"
                           filterable
                           clearable
                           placeholder="国家"
                           v-if="searchForm.areaCntyCd != '-1'"
                           @change="delete searchForm.areaProvCd;">
                  <el-option v-for="item in dataSoure.COM_00004"
                             :key="item.key"
                             :label="item.value"
                             :value="item.key">

                  </el-option>
                </el-select>
                <el-select filterable
                           placeholder="国家"
                           v-else
                           @change="delete searchForm.areaProvCd;">
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-select v-model="searchForm.areaProvCd"
                           filterable
                           clearable
                           placeholder="省份"
                           @change="changeData(4)">
                  <el-option v-for="item in dataSoure.COM_00001"
                             :key="item.key"
                             :label="item.value"
                             :value="item.key"
                             v-if="searchForm.areaCntyCd === '156'">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row class="select-wrapper">
            <el-col :span="5">
              <el-form-item label="撮合类型：">
                <el-select v-model="searchForm.serviecTpCd"
                           filterable
                           clearable
                           placeholder="请选择">
                  <el-option v-for="item in serviecTpCdData"
                             :key="item.codeKey"
                             :label='item.codeName'
                             :value="item.codeKey">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="需求类型：">
                <el-cascader :options="rqmTpCdData"
                             :show-all-levels="false"
                             :props="rqmTpCdProps"
                             v-model="searchForm.rqmTpCd"
                             filterable
                             clearable
                             change-on-select>
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="需求角色：">
                <el-select v-model="searchForm.rqmRole"
                           clearable
                           placeholder="请选择"
                           no-data-text="请先选择撮合类型和需求类型">
                  <el-option v-for="item in rqmRoleData"
                             :key="item.codeKey"
                             :label="item.codeName"
                             :value="item.codeKey">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="select-wrapper">
            <el-form-item label="发布日期：">
              <el-col :span="4">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="searchForm.ancDate_start"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                clearable
                                @change="changeData(1)"
                                class="time-select"></el-date-picker>
              </el-col>
              <el-col class="line"
                      :span="1">-</el-col>
              <el-col :span="4">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="searchForm.ancDate_end"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                clearable
                                @change="changeData(2)"
                                class="time-select"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
        <el-row class="search-result">
          <span>筛选后的结果</span>
        </el-row>
      </div>
    </div>
    <div class="search-container "
         v-if="searchType == '3'">
      <div class="search-choose esspclearfix">
        <el-row class="search-reset">
          <span>筛选条件</span>
          <span class="f-r">
            <el-button type="text"
                       @click="resetSeachOption">重置筛选</el-button>
          </span>
        </el-row>
        <el-form ref="form"
                 :model="searchForm"
                 label-width="85px"
                 size="mini"
                 class="select-content">
          <el-row class="select-wrapper">
            <el-form-item label="客户名称：">
              <el-input class="customNm"
                        v-model="customNm"
                        @change="changeType3(1)"></el-input>
              <!--<el-col :span="7">-->
              <!--<el-select filterable-->
              <!--class="cityClass"-->
              <!--v-model="searchForm.bngCityCd"-->
              <!--placeholder="请选择客户">-->
              <!--<el-option v-for="item in dataSoure.COM_00002"-->
              <!--:key="item.key"-->
              <!--:label="item.value"-->
              <!--:value="item.key"-->
              <!--v-if="searchForm.bngProvCd && item.key.startsWith(searchForm.bngProvCd.slice(0,2))">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</el-col>-->
            </el-form-item>
          </el-row>

          <!-- <el-col :span="11">
                        <el-form-item label="所在地:">
                            <el-col :span="7">
                                <el-select filterable
                                           v-model="searchForm.bngCntyCd"
                                           placeholder="国家"
                                           @change="changeType3(2)">
                                    <el-option v-for="item in dataSoure.COM_00004"
                                               :key="item.key"
                                               :label="item.value"
                                               :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="7">
                                <el-select filterable
                                           v-model="searchForm.bngProvCd"
                                           placeholder="省份"
                                           @change="changeType3(3)">
                                    <el-option v-for="item in dataSoure.COM_00001"
                                               :key="item.key"
                                               :label="item.value"
                                               :value="item.key"
                                               v-if="searchForm.bngCntyCd === '156'">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="7">
                                <el-select filterable
                                           v-model="searchForm.bngCityCd"
                                           placeholder="城市"
                                           @change="changeType3(4)">
                                    <el-option v-for="item in dataSoure.COM_00002"
                                               :key="item.key"
                                               :label="item.value"
                                               :value="item.key"
                                               v-if="searchForm.bngProvCd && item.key.startsWith(searchForm.bngProvCd.slice(0,2))">
                                    </el-option>
                                </el-select>
                            </el-col>

                        </el-form-item>
                    </el-col>-->
          <el-row class="select-wrapper">
            <el-form-item label="认证日期：">
              <el-col :span="7">
                <el-date-picker style="width: 250px; "
                                @change="changeType3(5)"
                                v-model="bsnDt"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                size="small"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
        <el-row class="search-result">
          <span>筛选后的结果</span>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "@/fetch/apiUrl.js";

export default {
  watch: {
    watchObject: {
      handler(newValue) {
        this.emitNewVal(newValue);
      },
      deep: true
    }
  },
  name: "EsspSearchPanel",
  props: {
    searchType: {
      type: Number | String,
      default: 2
    },
    searchForm: {
      type: Object,
      default: {}
    }
  },
  components: {},
  data() {
    return {
      bsnDt: [],
      customNm: "",
      //监听服务筛选条件
      watchObject: {
        contryCd: "", //国家
        provCd: "", //省份
        srvtpcd: "",
        rqmTpcd: "",
        roleRqm: "",
        startDate: "",
        endDate: "",
        city: "", //城市
        customNm: ""
      },
      dataSoure: {},
      matchType: [],
      rqmTpCdProps: {
        value: "codeKey",
        label: "codeName"
      },
      rqm: {
        major: [
          { key: "G01", value: "机械设备" },
          { key: "G04", value: "家用电器" },
          { key: "G05", value: "财务咨询" },
          { key: "G07", value: "交通运输设备" },
          { key: "G14", value: "医疗设备" },
          { key: "G37", value: "建筑材料" },
          { key: "G01", value: "养殖业" }
        ],
        prod: [
          { key: "01", value: "PPP项目" },
          { key: "02", value: "融资租赁" },
          { key: "03", value: "国企混改" },
          { key: "04", value: "投资融资" },
          { key: "05", value: "节能减排" },
          { key: "06", value: "旅游项目" },
          { key: "07", value: "金融扶贫" },
          { key: "08", value: "资产转让" }
        ],
        tech: [
          { key: "L0203", value: "法律服务" },
          { key: "I02", value: "互联网广告" },
          { key: "k", value: "房地产业" },
          { key: "L0207", value: "安全保护" },
          { key: "M0302", value: "知识产权" },
          { key: "J0404", value: "金融信息服务" }
        ]
      },
      rqmRoleList: []
    };
  },
  created() {
    this.getCasParentList();
    // 判断是否服务、求查询
    if (
      this.searchType === "1" ||
      this.searchType === "2" ||
      this.searchType === "4"
    ) {
      this.getMatchType(); // -获取撮合分类
    }
  },
  computed: {
    // 撮合分类数据源
    serviecTpCdData: function() {
      return this.matchType;
    },
    // 需求类型数据源
    rqmTpCdData: function() {
      let data = [];
      let { serviecTpCd, rqmTpCd } = this.searchForm;
      if (!!serviecTpCd) {
        data = this.matchType.filter(o => o.codeKey === serviecTpCd)[0]
          .children;
      }
      this.resetRqmTp();
      return data;
    },
    // 需求角色数据源
    rqmRoleData: function() {
      let data = [];
      let { serviecTpCd, rqmTpCd, rqmRole } = this.searchForm;
      if (!!serviecTpCd && serviecTpCd !== "03") {
        // 非项目撮合
        data = this.serviecTpCdData.filter(o => o.codeKey === serviecTpCd)[0]
          .roleList;
      } else {
        // 项目撮合
        if ((rqmTpCd || "").length > 0) {
          data = this.rqmTpCdData.filter(
            o => o.codeKey === rqmTpCd[rqmTpCd.length - 1]
          )[0].roleList;
        }
      }
      this.resetRqmRoleTp();
      return data;
    },
    // 服务分类数据源
    srvTpCdData: function() {
      return this.matchType.filter(o => o.codeKey === "01")[0].children;
    },
    //商品分类数据源
    prdTpCdData: function() {
      return this.matchType.filter(o => o.codeKey === "02")[0].children;
    }
  },
  methods: {
    resetRqmTp() {
      // 重置需求类型
      let self = this;
      setTimeout(() => {
        let rqmTpCd = self.searchForm.rqmTpCd;
        if (
          (rqmTpCd || "").length > 0 &&
          self.rqmTpCdData.filter(o => o.codeKey === rqmTpCd[0]).length < 1
        ) {
          this.searchForm.rqmTpCd = [];
        }
      }, 100);
    },
    resetRqmRoleTp() {
      // 重置角色
      let self = this;
      setTimeout(() => {
        let rqmRole = self.searchForm.rqmRole;
        if (
          (rqmRole || "").length > 0 &&
          self.rqmRoleData.filter(o => o.codeKey === rqmRole).length < 1
        ) {
          this.searchForm.rqmRole = "";
        }
      }, 100);
    },
    changeData(val) {
      //改变开始日期
      if (val === 1) {
        if (this.searchForm.ancDate_start != null) {
          this.watchObject.startDate = this.searchForm.ancDate_start;
        } else {
          this.watchObject.startDate = "";
        }
      }
      //改变结束日期
      if (val === 2) {
        if (this.searchForm.ancDate_end != null) {
          this.watchObject.endDate = this.searchForm.ancDate_end;
        } else {
          this.watchObject.endDate = "";
        }
      }
      if (val === 3) {
        delete this.searchForm.areaProvCd;
        this.watchObject.contryCd = this.searchForm.areaCntyCd;
      }
      if (val === 4) {
        this.watchObject.provCd = this.searchForm.areaProvCd;
      }
    },
    emitNewVal(val) {
      //onsole.log(this.watchObject)
      let search = this.watchObject;
      this.$emit("esspSearch", search);
    },
    // 获取一级下拉框参数数组
    getCasParentList() {
      let codeinfobytype = this.SSH.getItem("codeinfobytype") || [];
      if (codeinfobytype.length < 1) {
        this.$post(apiUrl.rqmList.getcasListUrl, {
          codeTypeList: [
            { type: "RZZL_00017" },
            { type: "RZZL_00018" },
            { type: "RZZL_00019" },
            { type: "COM_00004" },
            { type: "COM_00001" },
            { type: "COM_00002" }
          ]
        }).then(response => {
          if (response.resultMsg === "success") {
            let data = response.resultData;
            this.SSH.setItem("codeinfobytype", data);
            this.dataSoure = data;
          }
        });
      } else {
        this.dataSoure = codeinfobytype;
      }
    },
    // 重置搜索条件
    resetSeachOption() {
      8;
      //onsole.log(this.bsnDt)
      this.bsnDt = [];
      (this.watchObject = {
        contryCd: "", //国家
        provCd: "", //省份
        srvtpcd: "",
        rqmTpcd: "",
        roleRqm: "",
        startDate: "",
        endDate: "",
        city: ""
      }),
        (this.customNm = ""),
        //onsole.log('eeeeee',this.bsnDt)
        this.$emit("resetSeachOption");
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
    changeType3(val) {
      if (val === 1) {
        this.watchObject.customNm = this.customNm;
      }
      if (val === 2) {
        //国家
        delete this.searchForm.bngProvCd;
        delete this.searchForm.bngCityCd;
        this.watchObject.city = "";
        this.watchObject.provCd = "";
        this.watchObject.contryCd = this.searchForm.bngCntyCd;
      }
      if (val === 3) {
        //省份
        delete this.searchForm.bngCityCd;
        this.watchObject.city = "";
        this.watchObject.provCd = this.searchForm.bngProvCd;
      }
      if (val === 4) {
        this.watchObject.city = this.searchForm.bngCityCd;
      }
      if (val === 5) {
        if (this.bsnDt !== null) {
          this.watchObject.startDate = this.bsnDt[0];
          this.watchObject.endDate = this.bsnDt[1];
        } else {
          this.watchObject.startDate = "";
          this.watchObject.endDate = "";
        }
      }
    }
  }
};
</script>
<style lang="less">
.search-choose {
  .el-input__inner {
    height: 32px;
    line-height: 32px;
    width: 120px;
  }
  .time-select {
    margin: 0;
    .el-input__inner {
      width: 160px;
    }
  }
  .select-cascader {
    .el-cascader {
      .el-input__inner {
        width: 252px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
@import "../../assets/css/mixin";
@import "../../assets/css/common";
.search-container {
  .essp_bg();
  .search-choose {
    padding: 12px 45px 0 30px;
    z-index: 10;
    .search-reset {
      font-size: 16px;
      color: #333;
      margin-bottom: 5px;
      .esspline-height(40px, 40px);
    }
    .select-content {
      padding-left: 15px;
      .select-wrapper {
        border-bottom: 1px dotted #ebebeb;
        .el-form-item--mini.el-form-item {
          margin: 15px 0;
        }
        .el-col-7 {
          width: 28.5%;
        }
        .el-col-3 {
          width: 13%;
        }
        .line {
          width: 1.5%;
        }
      }
    }
    .search-result {
      margin-top: 40px;
      font-size: 16px;
      color: #333;
      line-height: 40px;
      border-bottom: 2px solid #f2f2f2;
    }
  }
}
</style>





