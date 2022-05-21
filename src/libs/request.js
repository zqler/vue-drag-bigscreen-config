import axios from "axios";
import { Message } from "ant-design-vue";
import Router from "@/router";
import storage from "store";

const errorHandler = error => {
  const status = error.response.status;
  switch (status) {
  /*eslint-disable*/
  case 400:
      error.message = "请求错误";
      break;
  case 401:
      Router.push({name:'login'});
      error.message = "未授权，请登录";
      break;
  case 403:
      error.message = "拒绝访问";
      break;
  case 404:
      error.message = `请求地址错误:${error.response.config.url}`;
      break;
  case 408:
      error.message = "请求超时";
      break;
  case 500:
      error.message = "服务器内部错误";
      break;
  case 501:
      error.message = "服务未实现";
      break;
  case 502:
      error.message = "网关错误";
      break;
  case 503:
      error.message = "服务不可用";
      break;
  case 504:
      error.message = "网关超时";
      break;
  case 505:
    error.message = "HTTP版本不受支持";
    break;
  default:
    break;
     /*eslint-disable*/
  }
  //错误信息弹框显示
  Message.error(error.message)
  return Promise.reject(error)
};
//添加中断
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (ever) => {
    for(let p in pending){
        if(pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}  
class HttpRequest {
  constructor(option={}) {
    this.baseUrl = option.url || "";
    this.queue = {};
    this.timeOut = option.timeout || 10000;
    this.withCredentials = true;
  }
  getToken() {
    return storage.get('token');
  }
  getInsideConfig() {
   const Authorization = this.getToken();
    const config = {
      baseURL: this.baseUrl,
      timeout: this.timeOUt,
      withCredentials: this.withCredentials,
      headers: {
        "token": Authorization
      },
      params: {},
      data: {}
    };
    return config;
  }

  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        removePending(config); //在一个ajax发送前执行一下取消操作
        config.cancelToken = new cancelToken((c)=>{
           // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
           pending.push({ u: config.url + '&' + config.method, f: c });  
        });
        this.queue[url] = true;
        if (config.method.toLowerCase() == "post") { 
          let newData = config.data;
          if (config.data instanceof FormData) { //文件类,文件类不需要stringify
              Object.assign(config.headers, formApiHeader); //修改`Content-Type`
          } else { //非文件类,stringify
              //空处理
              newData = (typeof newData == 'object' && Object.keys(newData).length >= 0) ? newData : {};
          }
          config.data = newData;
      }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url);
        const { data, status } = res;
        removePending(res.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
        if (typeof data === "object" && status === 200) {
          // 自己处理
          if (data.code === 0) {
            let _data = data.data || {};
            return _data;
          } else if (status=== 401) {
            const loginUrl = '/login'
            message.error('登录过期，请重新登录');
            // 清除token 和 已登录判断
            // window.sessionStorage.removeItem("token");
            // window.sessionStorage.removeItem("isLogin");
            // window.location.href = window.location.origin + loginUrl;
            Router.push({name:'login'})
            return Promise.reject(res);
          } else {
            Message.error(res.data.message);
            return Promise.reject(res);
          }
        }
        return data;
      },
      error => {
        this.destroy(url);
        let errorInfo = error.response;
        if (!errorInfo) {
          const {
            request: { statusText, status },
            config
          } = JSON.parse(JSON.stringify(error));
          errorInfo = {
            statusText,
            status,
            request: { responseURL: config.url }
          };
          console.log(errorInfo);
        }
        errorHandler(error)
      }
    );
  }

  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options)
      .then(data => {
        return { data };
      })
      .catch(error => {
        return { error };
      });
  }
}
export default HttpRequest;
// export const insert = data => {
//   return axios.request({
//     url: "/insert",
//     method: "post",
//     data
//   });
// };
// export const getList = params => {
//   return axios.request({
//     url: "/getList",
//     method: "get",
//     params
//   });
// };
