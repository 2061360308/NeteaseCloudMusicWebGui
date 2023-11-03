import { boot } from "quasar/wrappers";
import globalData from "src/store/globalData";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  console.log("globalData booting");
  // app.use(createPinia());
  // app.use(globalData);
  // const store = globalData();
  app.config.globalProperties.$globalData = globalData.state();
});
