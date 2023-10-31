import globalData from "src/store/globalData";

export default async ({ app }) => {
  app.config.globalProperties.$globalData = globalData;
};
