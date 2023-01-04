import { createPinia, defineStore } from "pinia";

const pinia = createPinia();

export const useStore = defineStore("main", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {},
});

export default pinia;
