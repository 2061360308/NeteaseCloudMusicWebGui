<template>
  <q-page> </q-page>
</template>

<style lang="scss">
.search_result,
.hot-search {
  width: 90%;
  max-width: 800px;
}

li {
  cursor: pointer;
}

@media (min-width: 800px) {
  .hot-search ol {
    columns: 2;
    column-gap: 20px;
  }
}
</style>

<script>
import { defineComponent } from "vue";
import { exportFile } from "quasar";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {};
  },
  async created() {
    if (this.$globalData.isLogin === null) {
      await this.checkLoginStatus();
    }
  },
  methods: {
    async checkLoginStatus() {
      // 根据cookie检测是否登录
      // 判断是否登录
      const cookie = localStorage.getItem("cookie"); // 获取cookie

      console.log("cookie", cookie);

      document.cookie = cookie; // 设置cookie

      if (cookie === null) {
        this.$globalData.isLogin = false;
        return;
      }

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
});
</script>
