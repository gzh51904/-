import React, { Component } from "react";

import { Tabs } from 'antd';

const { TabPane } = Tabs;

class Address extends Component {
    constructor() {
        super();
        this.state = {
            text: [{
                title: "出行人",
                tab: "Tab1",
                id: 1
            }, {
                title: "地址",
                tab: "Tab2",
                id: 2
            }]
        }
    }
    callback(key) {
        console.log(key);
    }
    render() {
        let { text } = this.state
        return <div>
            
        </div>
    }
}
export default Address