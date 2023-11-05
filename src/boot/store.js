import { boot } from "quasar/wrappers";
import { createPinia } from "pinia";
import globalData from "src/store/globalData";
import musicPlayer from "src/store/musicPlayer";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  console.log("store booting");
  // app.use(createPinia());
  // app.use(globalData);
  // const store = globalData();
  app.config.globalProperties.$globalData = globalData.state();
  app.config.globalProperties.$globalMethod = globalData.actions;

  // 创建并安装 Pinia 实例
  const pinia = createPinia();
  app.use(pinia);

  // 获取 store 实例
  // const globalDataStore = globalData(pinia);
  let musicPlayerStore = musicPlayer();

  app.config.globalProperties.$musicPlayer = musicPlayerStore;
});
