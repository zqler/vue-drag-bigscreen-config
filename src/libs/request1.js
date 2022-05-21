import axios from "axios";
import get from "lodash/get";
import storage from "store";
import { featchApiHeader, formApiHeader } from "utils";
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000, // 请求超时时间
  headers: {
    featchApiHeader
  } /* 设置post请求的数据格式 */,
  withCredentials: true /* 设置请求头携带cookie */,
  retry: 3 /* 设置请求失败之后重新请求次数 */,
  retryInterval: 5000 /* 设置请求失败之后再次发起请求的间隔 */
});
// 异常处理拦截
const errorHandler = error => {
  const status = get(error, "response status");
  switch (status) {
  /*eslint-disable*/
  case 400:
      error.message = "请求错误";
      break;
  case 401:
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
  return Promise.reject(error);
};
// 添加响应拦截器
request.interceptor.request.use((config)=>{
  // 根据实际情况加上token
    config.headers.Authorization = `${storage.get('ACCESS_TOKEN')}`;
    // 文件上传post特殊处理判断
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
},errorHandler)
// 添加请求拦截器
request.interceptor.response.use((response)=>{
   const dataAxios = response.data;
   const {code} = dataAxios;
   if(code===undefined){
     // 如果code 不存在,不是后端返回的数据
     return dataAxios;
   }else{
      //code 存在。后端返回数据
      switch(code){
          case 200: return dataAxios.data;
          default:  return dataAxios.data.message; // 其他错误后端接口返回错误信息
            
      }
     }
},errorHandler)
export default request;