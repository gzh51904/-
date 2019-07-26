import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";


import { Icon, Input, Button } from 'antd';

import axios from "axios";

import "./Mine.scss";

// 随机验证码
var array = "1234567890ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwsyz";
var codes = ''
//定义一个函数
function sj() {
    var code = "";

    //进行for循环
    for (var i = 0; i <= 6; i++) {
        //首先随机数组的长度
        var zm = parseInt(Math.random() * array.length);
        //然后取出随机数组中的真正的值
        code += array[zm];
    }
    codes = code
    return code
}

class Mine extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            code: "",
            msg: [{
                phone: "请输入手机号码",
                yzm: "请输入验证码"
            }]
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.random = this.random.bind(this)

    }
    componentWillMount() {
        let key = localStorage.getItem("Authorization");
        if (key) {
            this.props.history.push("/my")
        }
    }
    handleChange(name) {
        let value = this.refs[name].state
        // 判断手机号码是否正确
        if (name === "Authorization") {
            if (!(/^1[3456789]\d{9}$/.test(this.refs[name].state.value))) {
                console.log("手机号码错误");
                return false;
            }
        }
        // 判断验证码是否正确
        if (name === "code") {
            if (this.refs[name].state.value === codes) {
                console.log("验证码正确");
            } else {
                console.log("验证码错误");
            }
        }
        // 数据监听
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    async login() {
        let { value } = this.state.username
        if (this.state.username === "" || this.state.code === "") {
            return console.log("请输入完整信息")
        }
        // 点击登录发起请求查找数据库有没有该账号
        let find = await axios.get("http://18.139.229.218:1904/reg/check?" + "username=" + value);
        if (find.data.code === 1000) {
            let { data, headers } = await axios.post("http://18.139.229.218:1904/login", { username: value });
            localStorage.setItem("Authorization", data.data)
            localStorage.setItem("phone", value)
            // console.log(data);
            this.props.history.push("/my");
        }
        else {
            await axios.post("http://18.139.229.218:1904/reg", { username: value });
            let { data, headers } = await axios.post("http://18.139.229.218:1904/login", { username: value });
            localStorage.setItem("Authorization", data.data)
            localStorage.setItem("phone", value)
            this.props.history.push("/my");
        }
    }

    random() {
        if (this.refs.username.state.value == undefined) {
            return alert("请输入手机号码在获取验证码")
        }
        alert("10秒后验证码在控制台")
        setTimeout(() => {
            console.log(sj());
        }, 2000);
    }
    render() {
        return <div id="Mine">
            <div className="Mine-content">
                <div className="Mine-back">
                    <Icon type="left" />
                </div>
                <div className="Mine-title"><h2>手机号快捷登录</h2></div>
                <div className="Mine-input">
                    <div><Input ref='username' onBlur={val => { this.handleChange("username") }} className="Mine-username Mine-text" suffix={<Icon type="close" style={{ color: 'rgba(0,0,0,.45)' }} />} placeholder={this.state.msg[0].phone} /></div>
                    <div className="Mine-get">
                        <Input ref='code' onBlur={val => { this.handleChange("code") }} className="Mine-password Mine-text" placeholder={this.state.msg[0].yzm} />
                        <div className="Mine-getrandom" onClick={this.random}>获取验证码</div>
                    </div>
                </div>
                <div className="Mine-msg">未注册过的手机号将自动创建为玩途旅行账户</div>
                <div className="Mine-login">
                    <div className="Mine-info"><a >账号密码登录</a></div>
                    <div><Button type="primary" className="Mine-res" onClick={this.login.bind(this)}>登录</Button></div>
                </div>
            </div>
        </div>
    }
}
Mine = withRouter(Mine);

export default Mine;