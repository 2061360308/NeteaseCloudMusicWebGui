<template>
  <div
    class="avatar-box flex items-center q-mr-sm cursor-pointer"
    @click="login()"
  >
    <q-avatar>
      <img :src="avatarUrl" />
    </q-avatar>
    <div class="nickname text-primary">
      {{ nickname }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AvatarBox",
  data() {
    return {
      isLogin: false,
      avatarUrl: "https://cdn.quasar.dev/img/boy-avatar.png",
      nickname: "未登录",
    };
  },
  async created() {
    if (this.$globalData.isLogin === null) {
      await this.checkLoginStatus();
    }

    if (this.$globalData.isLogin === true) {
      console.log(this.$globalData.userData);
      this.nickname = this.$globalData.userData.profile.nickname;
      this.avatarUrl = this.$globalData.userData.profile.avatarUrl;
    }
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    async checkLoginStatus() {
      // 根据cookie检测是否登录
      // 判断是否登录
      const cookie = localStorage.getItem("cookie"); // 获取cookie

      console.log("cookie", cookie);

      document.cookie = cookie; // 设置cookie

      // let userData = await api.getLoginStatus(cookie); // 获取登录状态
      let loginState = await this.$api.user.getLoginStatus(cookie);

      // 未登录
      /**
       * Object { code: 800, message: "二维码不存在或已过期", cookie: "..." }
       */

      if (loginState.code === 800) {
        alert(
          "您未登录，或许会频繁收到<服务器繁忙>的错误\n提示，这是因为未登录的原因，登录后即可解决。"
        );
        return;
      }

      if (loginState.data.code === 200) {
        this.$globalData.userData = loginState.data;
        this.$globalData.isLogin = true;
      }
    },
  },
  // JavaScript code goes here
});
</script>

<style>
/* CSS styles go here */
</style>
