import axios from "axios";
import axiosRetry from "axios-retry";

// 封装Axios请求
const request = axios.create({
  baseURL: "/api",
});

// 失败后自动重试1次
axiosRetry(request, {
  retries: 1,
  shouldResetTimeout: true,
  retryDelay: (retryCount) => {
    return retryCount * 3000; // 重复请求延迟，每次请求之间间隔3s
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 做点判断
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 做些事情
    return response;
  },
  (error) => {
    // 异常响应的处理
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes("timeout")) {
        console.log(error.message);
      }
      error.message = "连接服务器失败";
    }
    console.log(error.message);
    return Promise.reject(error);
  }
);

export default request;
