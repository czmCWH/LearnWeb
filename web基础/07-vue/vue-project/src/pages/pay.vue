<template>
  <div class="main">
    <div class="loading" v-if="false">
      <van-loading type="spinner" vertical color="#ffffff" size="45px"
        >加载中</van-loading
      >
    </div>

    <h3>{{this.isEnglish ? 'Unlock all content' : '解锁全部内容'}}</h3>
    <div style="display: flex; justify-content: center; margin-top: 20px">
      <ul style="padding: 0; max-width: 80%;">
        <li class="title-box" v-for="(title, index) in titles">
          <div class="title-item">
            <div class="title-border">
              <div class="title-border-inner"></div>
            </div>
            <span>{{ title }}</span>
          </div>
        </li>
      </ul>
    </div>

    <ul class="price">
      <li
        :class="[
          this.buyType == index ? 'price-box price-box-sel' : 'price-box',
        ]"
         :style="{ width: this.itemW }"
        v-for="(opt, index) in options"
        @click="clickBuyItem(index)"
      >
        <div v-if="this.buyType == index" class="price-inner"></div>
        <div>
          <div>{{ opt.day }}</div>
          <div>{{ opt.price }}</div>
        </div>
        <div v-if="opt.tip" class="tip-box">{{ opt.tip }}</div>
      </li>
    </ul>
    <div
      v-if="isIphone"
      :class="[this.isSelApple ? 'btn btn-sel' : 'btn']"
      style="margin: 0 auto"
      @click="clickPayApple"
    >
    {{this.isEnglish ? 'Continue' : '继续'}}
    </div>
    <div v-else class="pay-other">
      <div :class="[this.isSelAlipay ? 'btn btn-sel' : 'btn']" @click="clickPayAlipay">{{ this.isEnglish ? 'Alipay' : '支付宝' }}</div>
      <div :class="[this.isSelWXpay ? 'btn btn-sel' : 'btn']" @click="clickPayWX">{{ this.isEnglish ? 'WeChat Pay' : '微信' }}</div>
    </div>
    <div class="bottom">
      <div @click="clickProtocol">{{ this.isEnglish ? 'Terms and Conditions' : '条款及条件' }}</div>
      <div @click="clickResumePurchase">{{ this.isEnglish ? 'Resume Purchase' : '恢复购买' }}</div>
    </div>
  </div>
</template>

<script>
import browser from "@/utils/browser";
import { showToast, showLoadingToast } from "vant";
import "vant/es/toast/style";
import { Loading } from "vant";
// import 'vant/es/loading/style';

export default {
  name: "chat",
  data() {
    return {
      titles: [
        "与心灵导师AI的随时对话",
        "让你有共鸣的肯定语",
        "适用于所有境遇的内容",
        "改变心态的提醒",
      ],
      options: [
        { day: "一周", price: "¥2.00", tip: "", payid: "day_107", mons: "107" },
        { day: "1月", price: "¥6.00", tip: "", payid: "day_1", mons: "1" },
        { day: "12个月", price: "¥48.00", tip: "优惠50%", payid: "day_12", mons: "12",},
      ],
      itemW: '74px',
      isIphone: false,
      isEnglish: false,
      buyType: 0,
      isSelApple: false,
      isSelAlipay: false,
      isSelWXpay: false,
    };
  },
  mounted() {
    document.title = "解锁";

    const { versions } = browser();
    this.isIphone = versions.ios;

    const user = JSON.parse(window.user);
    this.isEnglish = user.lang.length != 0;

    if (this.isEnglish) {
      this.itemW = '78px';
      this.titles = [
        "Anytime Conversation with the spiritual Teacher AI ",
        "Affirmations that resonate with you ",
        "Content for all situations ",
        "A reminder to change your mindset ",
      ];
      this.options = [
        { day: "a week", price: "¥2.00", tip: "", payid: "day_107", mons: "107" },
        { day: "1 months", price: "¥6.00", tip: "", payid: "day_1", mons: "1" },
        { day: "12 months", price: "¥48.00", tip: "50% off", payid: "day_12", mons: "12",},
      ];
    }
  },
  methods: {
    // apple订阅
    clickBuyItem(e) {
      this.buyType = e;
      console.log("购买类型=", this.buyType);
    },
    // apple订阅
    clickPayApple() {
      this.isSelApple = true;
      setTimeout(() => {
        this.isSelApple = false;
      }, 1500);
      console.log("apple订阅");
      var item = this.options[this.buyType];

      window.onDayEvent.postMessage(item.payid);
    },
    // 支付宝
    clickPayAlipay() {
      this.isSelAlipay = true;
      setTimeout(() => {
        this.isSelAlipay = false;
      }, 1500);
      console.log("支付宝");
      var item = this.options[this.buyType];
      window.onDayEvent.postMessage("ali," + item.mons);
    },
    // 微信
    clickPayWX() {
      this.isSelWXpay = true
      setTimeout(() => {
        this.isSelWXpay = false;
      }, 1500);
      console.log("微信");
      var item = this.options[this.buyType];
      window.onDayEvent.postMessage("wei," + item.mons);
    },
    // 条款及条件
    clickProtocol() {
      console.log("条款及条件");
      window.webURL.postMessage(
        "https://www.dezhi001.com/m/dailyquotes/policy.html"
      );
    },
    // 恢复购买
    clickResumePurchase() {
      console.log("恢复购买");
      window.restore.postMessage("restore");
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-size: 100% 100%;
  background-attachment: fixed;
  background-color: transparent;
  padding-top: 75px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
h3 {
  font-size: 30px;
  line-height: 52px;
  letter-spacing: 0px;
  text-align: center;
}
li {
  list-style: none;
}
.title-box {
  margin-bottom: 15px;
  color: rgb(245, 235, 235);
  font-size: 20px;
}
.title-item {
  display: flex;
  align-items: center;
}
.title-border {
  position: relative;
  flex-shrink:0;
  width: 22px;
  height: 22px;
  border: 1px solid rgb(1, 145, 255);
  margin-right: 8px;
}
.title-border-inner {
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  background-color: rgb(1, 145, 255);
}
.price {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 70px;
  margin-bottom: 38px;
  padding: 0 58px;
}
.price-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 74px;
  height: 113px;
  background-color: rgba(109, 114, 120, 0.3);
  text-align: center;
  box-sizing: border-box;
}
.price-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  border: 3px solid #f7b501;
}
.tip-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 45px;
  height: 20px;
  top: -10px;
  font-size: 9px;
  background-color: #f7b501;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 256px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background-color: rgba(109, 114, 120, 0.2);
  font-size: 28px;
  margin-bottom: 10px;
}
.btn-sel {
  background: url('@/assets/btn-bg.png') no-repeat center center;
  background-size: 252px 44px;
  border: none;
}
.pay-other {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 256px;
  margin: 0 auto;
  margin-top: 10px;
  padding-bottom: 34px;
  color: #0191ff;
  font-size: 12px;
  line-height: 15px;
}
.loading {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  // background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -75px;
}
</style>
