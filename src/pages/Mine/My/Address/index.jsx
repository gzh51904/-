import React, { Component } from "react";

import { Tabs, Icon } from 'antd';

import "./Address.scss";

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

    render() {
        let { text } = this.state
        return <div>
            <div className="tab">
                <Tabs defaultActiveKey="2">
                    {
                        text.map(item => {
                            return <TabPane tab={
                                <span>
                                 
                                    {item.title}
                                </span>
                            } key={item.id} >
                                {item.id}
                            </TabPane>
                        }
                        )
                    }
                </Tabs>
            </div>
        </div>
    }
}
export default Address