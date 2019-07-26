import React, { Component } from 'react';
import { api } from '../../utils';

import './Dest.scss'
class Dest extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            imgurl: '',
            tabs: [],
            products: [],
            sorts: [],
            isSelect: 0,
            cn_name: '',
            city_name: '',
            none: false
        }
        this.tabs_select = this.tabs_select.bind(this);
    }
    async componentDidMount() {
        console.log('state-afer:', this.state.list.length);
        let { data: { data } } = await api.get('/city_code');

        let list = data[0].itemList[0];
        let imgurl = list.base_info.h5_image_url;
        let tabs = list.tabs;
        let products = list.tab_info.products;
        let sorts = list.tab_info.sorts;
        this.setState({
            list,
            imgurl,
            tabs,
            sorts,
            products,
            cn_name: list.base_info.cn_name,
            city_name: list.base_info.city_name

        })
       


    }
    tabs_select(idx) {
       
        if (idx === 1) {
            this.none = true;
        } else if (idx === 0) {
            this.none = false;
        }

        this.setState({
            isSelect: idx,
            none: this.none
        })
  


    }
    render() {
        let { imgurl, tabs, products, cn_name, city_name } = this.state;
  
        return (
            <div style={{ position: 'relative'}}>
                <div className={tabs.length > 0 ? 'box' : 'none'}>
                    <div className='box_img'>
                        <img src={imgurl} className='img' alt={imgurl} />
                        <div className='title'>
                            <h4>{cn_name}</h4>
                            <p>{city_name}</p>
                        </div>
                    </div>
                    <div className='tab_select'>
                        {
                            tabs.map((item, idx) => {
                                return (
                                    <span key={idx} index={idx} className={this.state.isSelect === idx ? 'tab_span_select tab_span' : 'tab_span'} onClick={this.tabs_select.bind(this, idx)}>{item.name}</span>
                                )
                            })
                        }
                    </div>
                    <div className={this.state.none ? 'none' : 'products'}>

                        {
                            products.map((item, idx) => {
                                return (
                                    <div className='alias' key={idx}>
                                        <div className='products_img'>

                                            {
                                                item.images.map(item => {
                                                    return <img src={item.image_url} style={{ width: '100%', height: '100%' }} alt={item.id} />
                                                })[0]
                                            }
                                        </div>
                                        <h4>{item.alias}</h4>
                                        {
                                            item.tags.map((item, idx) => {
                                                return <span key={idx}>{item.tag.name}</span>
                                            })
                                        }
                                        <p className='products_price'>￥{item.min_price}起</p>
                                    </div>
                                )
                            })
                        }


                    </div>

                    <div className={this.state.none ? 'plane' : 'none'}>
                        <div className='title'>
                            <h2>添加具体信息就可以帮您查询合适的航班</h2>
                        </div>
                        <span>航班查询</span>
                    </div>
                    <div>
                        <img src={'https://spics.hitour.cc/b5460f216e958c47c3e8f98512334532.png?imageView2/1/w/750/h/376/format/'} alt={'二维码'} style={{ width: '100%' }} />
                    </div>
                </div>
                <div className={tabs.length > 0 ? 'none' : 'loading'}>
                    加载中...
            </div>
            </div>
        )
    }
}
export default Dest;
