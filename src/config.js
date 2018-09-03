import Axios from "axios";
import { Toast } from "antd-mobile";

//添加一个请求拦截器
Axios.interceptors.request.use(function(config){
    //在请求发出之前进行一些操作
    Toast.loading('加载中',0);
    return config;
});

//添加一个响应拦截器
Axios.interceptors.response.use(function(config){
    //在请求发出之前进行一些操作
    Toast.hide();
    return config;
});
  