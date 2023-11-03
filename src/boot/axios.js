// src/boot/axios.js

import { boot } from "quasar/wrappers";
import axios from "axios";
import { api } from "../api/api";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  console.log("axios booting");
  // 通过this.$axios和this.$API在Vue文件（Options API）内使用

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ 这将允许你使用this.$axios（Vue Options API形式）
  //       所以你不需要在每个vue文件中导入axios

  app.config.globalProperties.$api = api;
  // ^ ^ ^ 这将允许您使用this.$api（Vue Options API形式）
  //       这样您就可以轻松地根据应用程序的api执行请求
});
