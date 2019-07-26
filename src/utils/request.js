import axios from 'axios';


let instance = axios.create({
    baseURL: "http://18.139.229.218:1904",
});

// 请求拦截
axios.interceptors.request.use(config => {
    //每次利用axios发起的请求会进入这里
    // 添加token
    let token = localStorage.getItem("Authorization");
    if (config.url != "/login") {
        config.headers.Authorization = token;
    }
    return config;
}, error => {
    // 失败的回调
    return Promise.reject(error);
});

// 响应拦截：校验token
axios.interceptors.response.use(response => {
if(response.data.code==401){
    this.props.history.push("/mine")
}
return response;
},error => {
// Do something with response error
return Promise.reject(error);
});


function get(url = '', params = {}) {
    return instance.get(url, params)
}

function post(url = '', data, params = {}) {
    return instance.post(url, data, params)
}

export default {
    get,
    post
}