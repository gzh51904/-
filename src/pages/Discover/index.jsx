import React, { Component } from 'react';
import { Carousel } from 'antd';
import {api} from '../../utils';

import './base.css'
import './Discover.scss';

class Discover extends Component{
    constructor(){
        super()
        this.state={
            banner_list:[],
            hot_dests:[],
            groups:[],
            block_list:{},
            block_list_categories:[],
            block_list_groups:{}
        }
    }
    // 生命周期函数，一进页面就拿数据
    async componentWillMount(){
        let {data:{data}} = await api.get('/goodslist')
        data=data[0];
        // console.log(data);
        let {banner_list,block_list,groups,hot_dests}=data;
        console.log("banner_list",banner_list);
        console.log("block_list",block_list);
        console.log("groups",groups);
        console.log("hot_dests",hot_dests);

        // 设置轮播图
        this.setState({
            banner_list,
            hot_dests,
            groups,
            block_list:block_list[0],
            block_list_categories:block_list[0].categories,
            block_list_groups:block_list[0].groups[0]
        })
    }
    render(){   
        let {banner_list,hot_dests,groups,block_list,block_list_categories,block_list_groups} = this.state;     
        return (
            <div className="discover">
                <div className="d-banner">
                    <div className="d-header">
                        <h1>玩途旅行</h1>
                        <div className="search"><span></span><input type="text" name="" placeholder="搜索商品/目的地"/></div>                       
                    </div>
                    <Carousel autoplay >
                        {
                            banner_list.map(item=><div key={item.title}>
                                    <img src={item.h5_image_url} alt="item.title"/>
                                </div>
                            )
                        }
                    </Carousel>
                </div>
                
                <div className="d-main1">
                    <h2 className="text-ellipsis">开始计划下一次出行</h2>
                    <div className="main1-grid">
                        <div className="main1-grid-c">
                            <div className="gird-c">
                                <h3>周边游</h3>
                                <p>国内城市周边</p>
                            </div>
                            <div className="gird-c"></div>
                            <div className="gird-c"></div>
                            <div className="gird-c"></div>
                            <div className="gird-c"></div>
                        </div>
                    </div>                    
                    <div className="main-item">
                        <div className="main-item-list">
                            <h4>新人好礼</h4>
                            <p>88元礼券立即领取</p>
                            <img src={require("../../assets/img/gift.png")} alt=""/>
                        </div>
                        <div className="main-item-list">
                            <h4>旅行+</h4>
                            <p>五折特权天天抢</p>
                            <img src={require("../../assets/img/travel.png")} alt=""/>
                        </div>
                    </div>
                </div>

                <div className="d-main2">
                    <h2 className="text-ellipsis">十一大非常目的地</h2>
                    <p>Super自由精选目的地</p>
                    <div className="main2-box">
                        <div className="main2-item">
                            {
                                hot_dests.map(item=><dl key={item.dest_cn_name}>
                                        <dt><img src={item.cover_url} alt={item.dest_cn_name}/></dt>
                                        <dd>{item.dest_cn_name}</dd>
                                        <dd>{item.dest_en_name}</dd>
                                     </dl>)
                            }
                        </div>
                    </div>                   
                </div> 
                {
                    groups.map(item=><div className="d-main3" key={item.title}>
                    <h2 className="text-ellipsis">{item.title}</h2>
                    <p>{item.short_desc}</p>
                    <div className="main3-box">
                        <div className="main3-item">
                            {
                                item.products.map(item1=><dl key={item1.product_id}>
                                <dt><img src={item1.image_url} alt=""/></dt>
                                <dd>{item1.name}</dd>
                                {   
                                    
                                    item.products.summary?<dd style={{fontSize:"24px"}}>新加坡必去</dd>:<dd></dd>
                                }
                                <dd>￥<em>{item1.min_price}</em>起</dd>
                            </dl>)
                            }
                        </div>
                    </div>                   
                </div>  )
                
                }
                <div className="d-main4">
                    <h2 className="text-ellipsis">{block_list.title}</h2>
                    <div className="img-box">
                        <span>{block_list_groups.title}</span>
                        <img src={block_list_groups.h5_image_url} alt=""/>
                    </div>                  
                    <ul>
                        {                        
                            block_list_categories.map(item=><li key={item.category_name}>
                            <img src={item.image_url} alt=""/>
                            <div className="div-p">
                                <p>{item.category_name}</p>
                                <p>{item.summary}</p>
                            </div>                           
                            <span>></span>
                        </li>)
                        }
                    </ul>
                </div> 
                
                <div className="d-foot">
                    <img src={require("../../assets/img/d-foot.png")}/>
                </div>
            </div>
            
        )
    }
}

export default Discover;