import axios from 'axios';

//https://www.nanshig.com/mobile/index.php?act=index
// axios.defaults.baseURL = 'https://www.nanshig.com/mobile';
let instance = axios.create({
    baseURL:"http://18.139.229.218:1904",
});

function get(url='',params={}){
    return instance.get(url,params)
}

function post(url='',data,params={}){
    return instance.post(url,data,params)
}

export default{
    get,post
}