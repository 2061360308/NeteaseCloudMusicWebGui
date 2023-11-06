import VueLazyload from "vue-lazyload";
import { boot } from "quasar/wrappers";

export default boot(async ({ app }) => {
  app.use(VueLazyload);
});
