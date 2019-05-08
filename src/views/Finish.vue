<template>
  <div>
    <my-header></my-header>
    <check-step v-bind:step="4"></check-step>
    <main>
      <container>
        <br>
        <jumbotron class="mt-4">
          <div v-if="this.orderStatus=='100'">
            <app-success @restartCart="success = true"/>
            <h2>{{lblFinCongratulation}}</h2>
          </div>
          <div v-if="this.orderStatus!='100'">
            <h2>
              <p style="text-align:left;float: left;">{{orderStatusMsg}}</p>
            </h2>
            <p style="text-align:right;">
              <button
                class="btn btn-smart1"
                style="width:300px"
                @click="getOrderStatus"
                to
              >{{lblBtnRefresh}}</button>
            </p>
          </div>
          <hr>
          <ul>
            <li>
              <h5>
                {{lblCommAccountName}}
                <font color="5385c1">{{accountName}}</font>
              </h5>
            </li>
            <li>
              <h5>
                {{lblCommEmail}}
                <font color="5385c1">{{email}}</font>
              </h5>
            </li>
            <li>
              <h5>{{lblCommPpkOwner}}</h5>
            </li>
            <input v-bind:value="ownerPublicKey" class="form-control" disabled="true">
            <li>
              <h5>{{lblCommPpkActive}}</h5>
            </li>
            <input v-bind:value="activePublicKey" class="form-control" disabled="true">
          </ul>
          <hr>
          <div class="text-center py-2 mt-3">
            <button class="btn btn-outline-purple" @click="getAccount">
              {{lblBtnAccountInfo}}
              <i class="fa fa-paper-plane-o ml-2"></i>
            </button>
          </div>
          <br>
          <div v-if="this.jsonInfo != ''">
            <div>
              <table>
                <thead>
                  <tr>
                    <th scope="col" colspan="2">Resources</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>EOS</td>
                    <td>{{coreLiquidBalance}}</td>
                  </tr>
                  <tr>
                    <td>RAM</td>
                    <td>
                      {{ramUsage}} bytes used
                      <br>
                      {{ramQuota}} bytes owned
                    </td>
                  </tr>
                  <tr>
                    <td>CPU</td>
                    <td>
                      <span>
                        {{cpuWeight}}
                        <br>
                        ({{cpuLimitUsed/cpuLimitMax*100}} % used)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>NET</td>
                    <td>
                      <span>
                        {{netWeight}}
                        <br>
                        ({{netLimitUsed/netLimitMax*100}} % used)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br>
            <a @click="jsonClick">
              <font color="5385c1">{{lblJSonInfo}}</font>
            </a>
            <div v-if="this.showJSon" class="scrollable">
              <pre>{{jsonInfo}}</pre>
            </div>
          </div>
            </jumbotron>
            <jumbotron class="mt-4" v-if="this.jsonInfo == ''">
                <div class="list-card-body">
                    <ul class="list-card-items">
                        <li class="list-card-li">
                        <!-- nested-dl -->
                        <dl class="nested-dl ">
                            <dd class="nested-dl-dd">
                            <!-- nested-dl -->
                            <dl class="nested-dl  nested-dl-nested">
                                <dt class="nested-dl-dt">EOS</dt>
                                <dd class="nested-dl-dd">{{coreLiquidBalance}}</dd>
                            </dl>
                            <!-- /nested-dl -->
                            <!-- nested-dl -->
                            <dl class="nested-dl  nested-dl-nested">
                                <dt class="nested-dl-dt">RAM</dt>
                                <dd class="nested-dl-dd">{{ramUsage}} bytes used<br>{{ramQuota}} bytes owned</dd>
                            </dl>
                            <!-- /nested-dl -->
                            <!-- nested-dl -->
                            <dl class="nested-dl  nested-dl-nested">
                                <dt class="nested-dl-dt">CPU</dt>
                                <dd class="nested-dl-dd">{{cpuWeight}}<br>({{cpuLimitUsed/cpuLimitMax*100}} % used)</dd>
                            </dl>
                            <!-- /nested-dl -->
                            <!-- nested-dl -->
                            <dl class="nested-dl  nested-dl-nested">
                                <dt class="nested-dl-dt">NET</dt>
                                <dd class="nested-dl-dd">{{netWeight}}<br>({{netLimitUsed/netLimitMax*100}} % used)</dd>
                            </dl>
                            <!-- /nested-dl -->
                            </dd>
                        </dl>
                        <!-- /nested-dl -->
                        </li>
                    </ul>
                </div>
            </jumbotron>
<section class="section-box section-box-not-blank js-loading-area is-loaded">
            <div class="section-box-title section-box-title-alt">
              <h2 class="title">顧客情報
                <span class="loading-spin">
                  <span class="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </span>
                </span>
              </h2>
              <div class="section-box-title-sub-box">
                <a href="#" class="icon icon-medium icon-edit"></a>
              </div>
              <p class="last-update last-update-lined">山田 太郎 2018/12/28 更新</p>
            </div>
            <div class="section-box-inner">
              <div class="list-define-box list-define02">
                <dl>
                  <dt>投資目的</dt>
                  <dd>
                    <p class="bold highlight balance">バランス重視</p>
                    <span class="sub-name">安全性と収益性の配慮</span>
                  </dd>
                </dl>
                <dl>
                  <dt>資産状況</dt>
                  <dd>
                    <p class="bold">5,000万円 – 2億円未満</p>
                  </dd>
                </dl>
                <dl>
                  <dt>応対方法</dt>
                  <dd>
                    <div class="reception-list">
                      <p class="reception-list-dt">携帯</p>
                      <p class="reception-list-dd">月火水木金土</p>
                      <p class="reception-list-dd">10:00 – 11:00</p>
                    </div>
                    <div class="reception-list reception-list-ng">
                      <p class="reception-list-ng-dt">
                        <span class="status-bubble status-bubble-em status-bubble-small">NG</span>
                      </p>
                      <!-- detail-nav -->
                      <ul class="detail-nav ">
                        <li class="detail-nav-li">
                          <div class="detail-nav-link">自宅</div>
                        </li>
                        <li class="detail-nav-li">
                          <div class="detail-nav-link">訪問</div>
                        </li>
                        <li class="detail-nav-li">
                          <div class="detail-nav-link">DM</div>
                        </li>
                        <li class="detail-nav-li">
                          <div class="detail-nav-link">CC連絡</div>
                        </li>
                      </ul>
                      <!-- /detail-nav -->
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>勤務先</dt>
                  <dd>アクセンチュア株式会社</dd>
                </dl>
                <dl>
                  <dt>同意書情報</dt>
                  <dd>
                    <a href="#">SMBC順紹介</a>
                  </dd>
                </dl>
                <dl style="align-items: center;padding-bottom:12px;">
                  <dt style="position: relative;top: 2px">外部情報</dt>
                  <dd>
                    <div class="single-btn-box">
                      <p>
                        <a class="single-btn" href="#">
                          <i class="icon icon-company-16-black icon-small"></i>帝国企業情報</a>
                      </p>
                      <p>
                        <a class="single-btn" href="#">
                          <i class="icon icon-man-16-black icon-small"></i>見込客情報</a>
                      </p>
                      <p>
                        <a class="single-btn" href="#">
                          <i class="icon icon-company-16-black icon-small"></i>帝国企業情報</a>
                      </p>
                      <p>
                        <a class="single-btn" href="#">
                          <i class="icon icon-man-16-black icon-small"></i>見込客情報</a>
                      </p>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>PRM対象口座</dt>
                  <dd>対象</dd>
                </dl>
                <dl>
                  <dt>NISA</dt>
                  <dd>
                    <a href="">契約あり</a>
                  </dd>
                </dl>
                <dl>
                  <dt>ジュニアNISA</dt>
                  <dd>契約なし</dd>
                </dl>
              </div>
            </div>
            <div class="section-box-footer section-box-footer-white">
              <a class="js-toggle-btn" data-tgt=".js-karte-customer-info-personal" href="#">詳細を表示</a>
            </div>
          </section>
      </container>
    </main>

    <br>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import MyHeader from "./../components/NavbarPage";
import NavBread from "./../components/NavBread";
import CheckStep from "./../components/CheckStep";
import MyFooter from "./../components/MyFooter";
import Container from "./../components/common/Container";
import Jumbotron from "./../components/common/Jumbotron";
import AppSuccess from "./../components/AppSuccess";

export default {
  data() {
    return {
      success: false,
      showJSon: false
    };
  },

  computed: {
    ...mapGetters("multiLanguage", ["lang", "displayInfo"]),

    ...mapGetters("order", {
      accountName: "eosAccountName",
      email: "emailAddress",
      ownerPublicKey: "ownerPublicKey",
      activePublicKey: "activePublicKey",

      orderId: "orderId",
      orderStatus: "orderStatus",
      orderStatusLabel: "orderStatusLabel"
    }),

    ...mapGetters("account", [
      "accountName",
      "created",
      "coreLiquidBalance",
      "ramQuota",
      "ramUsage",
      "cpuWeight",
      "cpuLimitUsed",
      "cpuLimitMax",
      "netWeight",
      "netLimitUsed",
      "netLimitMax",
      "jsonInfo"
    ]),

    lblJSonInfo: function() {
      return this.showJSon ? "Hide JSON" : "Show JSON";
    },

    // multi-language display process of item within screen.
    screenItemInfo: function() {
      return this.displayInfo.filter(row => row.function_name === "fin");
    },

    commonScreenItemInfo: function() {
      return this.displayInfo.filter(row => row.function_name === "comm");
    },

    // ----------------------------------------------multi-language--start-----------------------------------------------------
    lblInitInfo: function() {
      return this.screenItemInfo.filter(
        row => row.item_name === "lblInitInfo"
      )[0].item_value;
    },

    lblFinCongratulation: function() {
      return this.screenItemInfo.filter(
        row => row.item_name === "lblFinCongratulation"
      )[0].item_value;
    },

    lblBtnRefresh: function() {
      return this.screenItemInfo.filter(
        row => row.item_name === "lblBtnRefresh"
      )[0].item_value;
    },

    lblBtnAccountInfo: function() {
      return this.screenItemInfo.filter(
        row => row.item_name === "lblBtnAccountInfo"
      )[0].item_value;
    },

    lblCommAccountName: function() {
      return this.commonScreenItemInfo.filter(
        row => row.item_name === "lblCommAccountName"
      )[0].item_value;
    },

    lblCommEmail: function() {
      return this.commonScreenItemInfo.filter(
        row => row.item_name === "lblCommEmail"
      )[0].item_value;
    },

    lblCommPpkOwner: function() {
      return this.commonScreenItemInfo.filter(
        row => row.item_name === "lblCommPpkOwner"
      )[0].item_value;
    },

    lblCommPpkActive: function() {
      return this.commonScreenItemInfo.filter(
        row => row.item_name === "lblCommPpkActive"
      )[0].item_value;
    },

    orderStatusMsg: function() {
      return this.orderStatusLabel ? this.orderStatusLabel : this.lblInitInfo;
    }
    // ----------------------------------------------multi-language--end-------------------------------------------------------
  },

  methods: {
    ...mapActions("order", {
      getOrderStatus: "getOrder"
    }),

    ...mapActions("account", ["getAccount"]),

    jsonClick() {
      this.showJSon = !this.showJSon;
    }
  },

  mounted: function() {
    window.setTimeout(() => this.getOrderStatus(), 3000);
  },

  components: {
    MyHeader,
    NavBread,
    CheckStep,
    Container,
    Jumbotron,
    MyFooter,
    AppSuccess
  }
};
</script>
<style scoped lang="css">
@import "./../assets/css/smart1.css";
@import "./../assets/css/smart.css";
table {
  border: 2px solid #5385c1;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #5385c1;
  color: rgba(255, 255, 255, 0.66);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 50px;
  padding: 5px 5px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}
</style>
