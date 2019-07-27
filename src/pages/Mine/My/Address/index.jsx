import React, { Component } from "react";

import { Tabs, Icon, List, Card } from 'antd';


import "./Address.scss";

const { TabPane } = Tabs;


class Address extends Component {
    constructor() {
        super();
        this.state = {
            text: [{
                title: "出行人",
                tab: "Tab1",
                id: 1,
            }, {
                title: "地址",
                tab: "Tab2",
                id: 2
            }],
            toggle1: false,
            toggle2: true,
        }
    }
    tab(id) {
        let { toggle1, toggle2 } = this.state;

        if (id == 2) {
            toggle2 = false;
            toggle1 = true;
        }
        if (id == 1) {
            toggle2 = true;
            toggle1 = false;
        }
        this.setState({
            toggle2,
            toggle1
        })
    }
    addpeo(){
        let {history}=this.props
        history.push("/peo_info")
    }
    render() {
        let phone = localStorage.getItem("phone")
        let { text } = this.state
        return <div style={{ backgroundColor: "#27284b", height: "100%" }} className="Address">
            <div className="tab" >
                <Tabs defaultActiveKey="1" onTabClick={this.tab.bind(this)} >
                    {
                        text.map(item => {
                            return <TabPane style={{ color: "#fff", textAlign: "center" }} tab={<span>{item.title} </span>} key={item.id}>
                                <div style={{ width: "100%", border: "1px solid red", backgroundColor: "#fff", color: "#000" }}>
                                </div>
                            </TabPane>
                        })}
                </Tabs>
            </div>
            <div className={this.state.toggle1 ? "show" : ""}>
                <ul className="addressUl">
                    <li><span className="span">{phone}</span></li>
                    <li onClick={this.addpeo.bind(this)}><span className="span">新增常用出行人</span></li>
                </ul>
            </div>
            <div className={this.state.toggle2 ? "show" : ""}>
                <ul className="addressUl">
                    <li><span className="span">666</span></li>
                    <li><span className="span">新增常用地址</span></li>
                </ul>
            </div>
        </div>
    }
}
export default Address