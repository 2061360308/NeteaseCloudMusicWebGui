import { defineStore } from "pinia";

export const globalData = defineStore("counter", {
  state: () => ({
    userData: {},
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});

export default globalData;
