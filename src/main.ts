import { createApp } from "vue";

// 模块
import router from "./router";
import pinia from "./store";
// 样式
import "./tailwind.css";
// 组件
import App from "./App.vue";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
