import React, { Component } from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber } from 'antd';

import { connect } from 'react-redux';

import "./info.scss";
const { Option } = Select;

class Info extends Component {
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        return <div id="info">
            <div>
                <ul>
                    <h2>出行人姓名</h2>
                    <li>
                        <Form.Item className="info-from" validateStatus="error">
                            <Input className="info-input" placeholder="中文姓名" id="error" />
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item className="info-from" validateStatus="error">
                            <Input className="info-input" placeholder="名字(英文)" id="error" />
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item className="info-from" validateStatus="error">
                            <Input className="info-input" placeholder="姓氏(英文)" id="error" />
                        </Form.Item>
                    </li>
                </ul>
                <ul>
                    <h2>证件</h2>
                    <li>
                        <Form.Item className="info-from" validateStatus="error">
                            <Input className="info-input" placeholder="证件类型   身份证" id="error" />
                            <Select  defaultValue="身份证"  style={{ width:150}} dropdownClassName="info-item" className="info-card">
                                <Option style={{width:"100%",height:"100px",fontSize:"40px"}} className="info-item" value="身份证">身份证</Option>
                                <Option style={{width:"100%",height:"100px",fontSize:"40px"}} className="info-item" value="护照">护照</Option>
                                <Option style={{width:"100%",height:"100px",fontSize:"40px"}} className="info-item" value="港澳通行证">港澳通行证</Option>
                                <Option style={{width:"100%",height:"100px",fontSize:"40px"}} className="info-item" value="台湾通行证">台湾通行证</Option>
                                <Option style={{width:"100%",height:"100px",fontSize:"40px"}} className="info-item" value="户口本">户口本</Option>
                                <Option style={{width:"100%",height:"100px",fontSize:"40px"}} className="info-item" value="出生证明">出生证明</Option>
                                <Option style={{width:"100%",height:"100px",fontSize:"40px"}} className="info-item" value="军官证">军官证</Option>
                                <Option style={{width:"100%",height:"100px",fontSize:"40px"}} className="info-item" value="回乡证">回乡证</Option>
                                <Option style={{width:"100%",height:"100px",fontSize:"40px"}} className="info-item" value="台胞证">台胞证</Option>
                                <Option style={{width:"100%",height:"100px",fontSize:"40px"}} className="info-item" value="其他">其他</Option>
                            </Select>
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item className="info-from" validateStatus="error">
                            <Input className="info-input" placeholder="证件号码" id="error" />
                        </Form.Item>
                    </li>
                </ul>
                <ul>
                    <h2>其他信息</h2>
                    <li>
                        <Form.Item className="info-from" validateStatus="error">
                            <Input className="info-input" placeholder="中文姓名" id="error" />
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item className="info-from" validateStatus="error">
                            <Input className="info-input" placeholder="名字(英文)" id="error" />
                        </Form.Item>
                    </li>
                    <li>
                        <Form.Item className="info-from" validateStatus="error">
                            <Input className="info-input" placeholder="姓氏(英文)" id="error" />
                        </Form.Item>
                    </li>
                </ul>
            </div>
        </div>
    }
}
Info = connect((state) => {
    return {
        cartlist: state.people.goodslist
    }
})(Info)


export default Info;