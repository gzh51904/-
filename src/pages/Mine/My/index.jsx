import React from 'react';
import "./My.scss";
import axios from "axios";
import { Icon } from "antd";
class My extends React.Component {
    constructor() {
        super()
        this.state = {
            phone: localStorage.getItem("phone"),
            my: [
                {
                    icon: "profile",
                    text: "我的订单",
                    type: "right",
                    path: "/cart"
                }, {
                    icon: "fund",
                    text: "优惠券",
                    type: "right",
                    path: "/yhq"
                }, {
                    icon: "user",
                    text: "账号",
                    type: "right",
                    path: "/zh"
                }, {
                    icon: "switcher",
                    text: "常用出行人及地址",
                    type: "right",
                    path: "/peo"
                }, {
                    icon: "mail",
                    text: "旅行+会员计划",
                    type: "right",
                    path: "/hy"
                }
            ],
            call: [{
                icon: "phone",
                title: "玩途服务热线「海外」",
                language: "语言：中文|服务时间：24小时",
                type: "right"
            }, {
                icon: "phone",
                title: "玩途服务热线「海外」",
                language: "语言：中文|服务时间：24小时",
                type: "right"
            }]
        }
        this.loginout = this.loginout.bind(this)
    }
    componentWillMount() {
        if (localStorage.getItem("Authorization") == null || "") {
            this.props.history.push("/mine")
        }
    }
    loginout() {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("phone");
        this.props.history.push("/discover")
    }
    goto(path) {
        this.props.history.push(path)
        // console.log(path);
    }
    render() {
        let { phone, my, call } = this.state;
        // console.log(my);

        return <div id="My">
            <div className="mine">
                <div className="content">
                    <header className="header">
                        <h3 className="header-title">个人中心</h3>
                        <p className="header-phone">{phone}</p>
                        <span className="header-icon"></span>
                    </header>
                    <div className="icard">
                        <div className="icard-top">
                            <span></span>
                            <span>玩途旅行基金</span>
                        </div>
                        <div className="icard-middle">
                            <div><img src="https://spics.hitour.cc/2ed441340b94f5de1487618c692e75fc.png" alt="" /></div>
                            <div><p>基金余额</p><p>1基金可无门槛抵扣医院机票消费</p></div>
                            <div><span>￥</span><span>0</span><span>&gt;</span></div>
                        </div>
                        <div className="icard-bottom"></div>
                    </div>
                    <div className="invite">
                        <div>
                            <img src="https://spics.hitour.cc/f92a249ad195989d7a0d730523e4fc6a.png" alt="" />
                        </div>
                        <div>
                            <p>邀请好友赚基金</p>
                            <p>已过期，需要重新购买机票获得权限</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-index">我的</p>
            <div className="my">
                <div className="content">
                    <div>
                        <ul className="my-item" >
                            {
                                my.map(item => {
                                    return <li className="my-item-list" key={item.text} onClick={this.goto.bind(this, item.path)}>
                                        <span className="icon"><Icon type={item.icon}></Icon></span>
                                        <span>{item.text}</span>
                                        <span className="type"><Icon type={item.type}></Icon></span>
                                    </li>
                                })
                            }
                        </ul>
                    </div>

                </div>
                <div className="newtype">
                    <img style={{ width: "100%" }} src="https://spics.hitour.cc/7e9082a282658c88fa3ca8fdc9815d55.png?imageView2/1/w/828/h/104" alt="" />
                </div>
            </div>
            <p className="text-index">联系玩途</p>
            <div className="call">
                <div className="content">
                    <ul>
                        {
                            call.map((item, idx) => {
                                return <li className=" call-item-list" key={idx}>
                                    <span className="icon"><Icon type={item.icon}></Icon></span>
                                    <div>
                                        <p style={{ color: "#000" }}>{item.title}</p>
                                        <p>{item.language}</p>
                                    </div>
                                    <span className="type"><Icon type={item.type}></Icon></span>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="logout" onClick={this.loginout.bind(this)}>
                退出登录
            </div>
        </div>
    }
}
export default My