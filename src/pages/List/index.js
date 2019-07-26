import React, { Component } from 'react';

import { Icon } from 'antd';
import { api } from '../../utils';
import './List.scss';

class List extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            hots: [],
            subs: [],
            isSelect: 0,
            lod: true
        }
        this.check = this.check.bind(this);
        this.onSelect_hots = this.onSelect_hots.bind(this);
        this.onSelect_subs = this.onSelect_subs.bind(this);

    }

    async componentDidMount() {
        let { data: { data } } = await api.get('/from');


        let list = data[0].data;

        let hots = data[0].data.map((item) => {
            return item.hots;
        })[0];

        let subs = data[0].data.map((item) => {
            return item.subs;
        })[0];

        this.setState({
            list,
            hots,
            subs,
            isSelect: 0
        })


    }
    check(id, e) {
        let { list } = this.state;
        let hots = list.map((item) => {
            return item.hots;
        })[id];

        let subs = list.map((item) => {
            return item.subs;
        })[id];

        this.setState({
            hots,
            subs,
            isSelect: Number(e.currentTarget.getAttribute('index'))
        })

    }
    async onSelect_hots(code) {

        let { history } = this.props;

        let pathname = '/dest';

        history.push({
            pathname
        })

    }
    async onSelect_subs(code) {
        console.log(code);
    }
    render() {
        let { list, hots, subs } = this.state;
        return (
            <div style={{ position: 'relative'}}>
                <div className={list.length > 0 ? 'list_item' : 'none'}>
                    <div className='header'>
                        <h1 className="list_h1">下一次你想去哪里？</h1>
                        <div className='input_box' >
                            <Icon type="environment" className='icon' />
                            <input type="text" placeholder="输入一个目的地" className='search-input' />
                        </div>
                    </div>
                    <div className='menu'>

                        <ul className='left' >
                            {
                                list.map((item, idx) => {
                                    return (
                                        <li key={item.title} index={idx} className={this.state.isSelect === idx ? 'activeted item_p' : 'item_p'} onClick={this.check.bind(this, idx)}>
                                            <span className={this.state.isSelect === idx ? 'left_title' : ''}>{item.title}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                        <div className='right'>
                            <div className='right_top'>
                                {
                                    hots.map((item, idx) => {
                                        return <div className="host" key={idx} onClick={this.onSelect_hots.bind(this, item.code)}>
                                            <div className='hots_box'>
                                                <div style={{ backgroundImage: "url(" + item.image_url + ")" }} className='hots_img'>
                                                    <div className='hots_p'>
                                                        <p>{item.title}</p>
                                                        <p>{item.code}</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className='right_bottom'>
                                {
                                    subs.map((item, idx) => {
                                        return <div className="subs" key={idx}>
                                            <h4 className='subs_h4'>{item.title}</h4>
                                            {
                                                item.subs.map(item => {
                                                    return <p key={item.id} className='subs_p' onClick={this.onSelect_subs.bind(this, item.code)}>{item.title}</p>
                                                })
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <div className={list.length > 0 ? 'none' : 'loading'}>
                    加载中...
                </div>
            </div>
        );
    }
}


export default List;