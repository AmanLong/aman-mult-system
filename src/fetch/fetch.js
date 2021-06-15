import axios from 'axios';
// import qs from 'qs'
import { Message } from 'element-ui';
import { Loading } from 'element-ui';
import router from '@/router/index.js'
import Urls from './urls'

// import router from './router'

//axios请求的全局配置
axios.defaults.timeout = 30000;
axios.defaults.baseURL = CONFIG.BASE_URL;

let loading = null;
// 添加响应拦截器
axios.interceptors.response.use(function (res) {
    loading.close();
    if (!res) {
        return null;
    } else {
        return res.data;
    }

}, function (err) {
    let status = err.response && err.response.status;
    //未授权 跳转登陆页面
    if (status === 401) {
        window.sessionStorage.clear();
        router.push({ path: '/' });
        return;
    }
    loading.close();
    // 响应错误进行提示
    if(status === 400){
        Message({
            type: 'error',
            showClose: true,//显示关闭按钮
            message: err.response.data.message
        });
    }
    else{
        Message({
            type: 'error',
            showClose: true,//显示关闭按钮
            message: "请求数据失败！"
        });
    }
    
});


export function fetch(config) {

    let token = window.sessionStorage.getItem('RZ_token');

    let baseConfig = {
        method: config.method,
        url: config.url,
    };

    let method = config.method.toLowerCase();

    loading = Loading.service({
        fullscreen: true,
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.5)',
        text: '拼命加载中'
    });

    //所有请求带上Authorization  'Basic '+
    if (token) {
        baseConfig.headers = { Authorization: token };
    }

    if (method === 'get') {
        baseConfig.params = config.params;
    } else if (method === 'post') {
        // baseConfig.data=qs.stringify(config.params);
        baseConfig.data = config.params;
    }
    //导出数据的特殊判断
    if (config.fileExport) {
        baseConfig.responseType = 'arraybuffer';
    }
    return axios(baseConfig);
}

export default {
    /*登陆接口*/
    Login(config) {
        return fetch({
            method: 'get',
            url: Urls.login,
            params: config.params
        });
    },
}
