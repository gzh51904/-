import React from 'react';

import axios from 'axios'
import {connect} from 'react-redux'
import './Discover.scss'

class Discover extends React.Component{
    constructor(){
        super()
        this.state={
            info:[],
            n:false
        }
        this.dd=this.dd.bind(this)
        this.ee=this.ee.bind(this)
    }
   async  componentWillMount(){
        //    let {data}=await axios.get('https://www.wantu.cn/public/product/productDataForMobile?product_id=14753')
        let {data:{datas}}=await axios.get('https://www.nanshig.com/mobile/index.php?act=goods&op=goods_detail&goods_id=227242&key=')
        console.log('data',datas);
            
        this.setState({
            // info:{
            //     ...datas.goods_commend_list,
            // //   imgurl:datas.goods_image
            // }
            info:datas.goods_commend_list,
        })
         
        console.log('info',this.state.info);
        }
  dd(){
      this.setState({
          n:true
      })
  }
  ee(){
    this.setState({
        n:false
    })
  }
    render(){
        let {info,n}=this.state
        console.log('discover.props',this.props);
        let{dispatch}=this.props
        
        return(
            <div>
            <div>发现</div>
            {
                info.map(item=>{
                    return(
                        <div key={item.goods_name}>
                <img src={item.goods_image_url} alt={item.goods_name}/>
                   <h2>{item.goods_name}</h2>
                  <p>{item.goods_promotion_price}</p>
                  <button onClick={()=>{
                  dispatch({type:'add_to_cart',payload:{id:item.goods_id,url:item.goods_image_url,name:item.goods_name,price:item.goods_promotion_price,can_select:false}})
                             }}>添加购物车</button>
                    </div>
                    )
                })
            }
                <button onClick={this.dd}>111111</button><button onClick={this.ee}>2323232</button>
                <div className={n?'':'n'}>adsdadsadsa</div>
                <div className={n?'n':''}>12qeqwedwd</div>
            </div>
        )
    }
}

Discover=connect((state)=>{
    return{
        list:state.goodslist
    }
})(Discover)
export default Discover;