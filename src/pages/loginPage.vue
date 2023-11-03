<template>
  <q-page style="height: 100%">
    <div class="absolute-center">
      <div class="qr-code" v-if="loginMethod === 'qrCode'">
        <div class="cf">
          <img
            class="fl gt-xs"
            src="image/qrcode.png"
            style="width: 125px; height: 220px; margin-right: 20px"
          />
          <!-- <img :src="qrCodeUrl" alt="二维码" /> -->
          <div class="fr">
            <div>
              <p class="text-weight-bold text-h5" style="text-align: center">
                扫码登录
              </p>
              <img :src="qrCodeUrl" alt="二维码" />
            </div>
          </div>
        </div>
      </div>
      <div class="verification-code" v-else>
        <q-input
          rounded
          outlined
          v-model="phone"
          label="手机号"
          type="tel"
          prefix="+86"
          @keyup.enter="sendVerificationCode"
        />
        <div class="row">
          <q-input
            rounded
            outlined
            v-model="verificationCode"
            label="验证码"
            class="q-my-sm"
            @keyup.enter="loginWithVerificationCode"
          />
          <q-btn
            color="primary"
            :label="
              sendVerificationCodeWaitTime === 0
                ? '获取验证码'
                : sendVerificationCodeWaitTime + 's 后重新获取'
            "
            class="q-ma-md text-xl"
            :disable="!(sendVerificationCodeWaitTime === 0)"
            @click="sendVerificationCode"
          />
        </div>

        <div class="q-mx-md q-my-sm">
          <q-btn color="primary full-width" label="登录" @click="login" />
        </div>
      </div>
      <div
        class="switch-method row justify-end text-caption text-light-blue-5 cursor-pointer"
      >
        <div
          v-if="loginMethod === 'qrCode'"
          data-name="verification-code"
          @click="switchLoginMethod"
        >
          手机验证码登录 >
        </div>
        <div v-else data-name="qrCode" @click="switchLoginMethod">
          扫码登录 >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { tSThisType } from "@babel/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      loginMethod: "qrCode",
      showQRCode: true,
      qrCodeUrl: "",
      phone: "",
      verificationCode: "",
      sendVerificationCodeWaitTime: 0, // 发送验证码的等待时间
      isLoggingIn: false,
    };
  },
  async created() {
    const [qrcode, key] = await this.$api.user.getLoginQrCode();
    this.qrCodeUrl = qrcode;
  },
  methods: {
    switchLoginMethod(e) {
      // console.log(e);
      console.log(e.target.dataset.name);
      this.loginMethod = e.target.dataset.name;
    },
    async waiteScanCode(key, expired, login_success) {
      // 等待扫码
      let timer;

      timer = setInterval(async () => {
        const statusRes = await this.$api.user.checkStatus(key);
        if (statusRes.code === 800) {
          this.$q.notify({
            message: "二维码已失效",
            color: "info",
            icon: "report_problem",
          });
          clearInterval(timer);
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie
          clearInterval(timer);
          const user = await getLoginStatus(statusRes.cookie);
          localStorage.setItem("cookie", statusRes.cookie);
          console.log("user", user);
          this.$q.notify({
            message: "登录成功",
            color: "positive",
            icon: "report_problem",
          });
          this.$router.back();
        }
      }, 3000);
    },
    async sendVerificationCode() {
      if (!this.phone) {
        this.$q.notify({
          message: "请输入手机号",
          color: "warning",
          icon: "report_problem",
        });
        return;
      }
      this.isSendingVerificationCode = true;

      const result = await this.$api.user.sendPhoneVerificationCode(this.phone);

      if (result.code === 200) {
        this.$q.notify({
          message: "验证码已发送，请注意查收",
          color: "positive",
          icon: "report_problem",
        });

        this.sendVerificationCodeWaitTime = 120;
        const timer = setInterval(() => {
          this.sendVerificationCodeWaitTime--;

          if (this.sendVerificationCode === 0) {
            clearInterval(timer);
          }
        }, 1000);
      } else {
        console.log("发送验证码失败：", result.message);
        this.$q.notify({
          message: "发送验证码失败，请重试",
          color: "negative",
          icon: "report_problem",
        });
      }
    },
    async login() {
      if (!this.phone || !this.verificationCode) {
        this.$q.notify({
          message: "请输入手机号和验证码",
          color: "warning",
          icon: "report_problem",
        });
        return;
      }

      const verifyResult = await this.$api.user.verifyPhoneVerificationCode(
        this.phone,
        this.verificationCode
      );

      if (verifyResult) {
        const res = await this.$api.user.loginByPhoneCaptcha(
          this.phone,
          this.verificationCode
        );

        console.log("登录结果res：", res);
        /**
         * {
         *    loginType: 1, code: 200, account: {…}, token: '',
         *    account: { id: 2121989064, userName: "1_15234941791", type: 1, … }, bindings: [ {…}, {…}, {…} ],
         *    code: 200, cookie:'',
         *    loginType: 1,
         *    profile:{},
         *    token:{}
         * }
         */

        const user = await this.$api.user.getLoginStatus(res.cookie);
        localStorage.setItem("cookie", res.cookie); // 储存cookie到数据
        // 设置cookie
        document.cookie = res.cookie;

        this.$globalData.userData = user;

        this.$q.notify({
          message: "登录成功",
          color: "positive",
          icon: "report_problem",
        });
        this.$router.back();
      } else {
        this.$q.notify({
          message: "验证码错误",
          color: "negative",
          icon: "report_problem",
        });
        console.log(verifyResult);
      }
    },
  },
});
</script>
