import React from 'react';

import {api} from '../../utils/index'
import {connect} from 'react-redux'
import './Discover.scss'

class Discover extends React.Component{
    constructor(){
        super()
        this.state={
            info:[],
            n:false,
            name:'',
            id:'',
            price:''
        }
        this.dd=this.dd.bind(this)
        this.ee=this.ee.bind(this)
    }
   async  componentDidMount(){
       console.log(123);
       
        //    let {data}=await axios.get('https://www.wantu.cn/public/product/productDataForMobile?product_id=14753')
        let {data:{data}}=await api.get('/info')
        console.log('data',data);
        console.log(234);
        let info=data[0].itemList[0]
        this.setState({
            // info:{
            //     ...datas.goods_commend_list,
            // //   imgurl:datas.goods_image
            // }
            info,
            name:info.description.name,
            price:info.show_prices.mark_price,
            id:info.product_id
            
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
        console.log('info222',this.state.info);
        let {info,n,name,price,id}=this.state
       let {description}=this.state.info
       console.log('666',description);
       
        console.log('discover.props',this.props);
        let{dispatch}=this.props
        
        return(
            <div>
            <div>发现</div>
            {/* {
                info.map(item=>{
                    return( */}
                        <div>
                {/* <img src={item.goods_image_url} alt={item.goods_name}/> */}
                   <h2>{name}</h2>
                  <p>{price}</p>
                  <button onClick={()=>{
                //   dispatch({type:'add_to_cart',payload:{id:item.goods_id,url:item.goods_image_url,name:item.goods_name,price:item.goods_promotion_price,can_select:false}})
                dispatch({type:'add_to_cart',payload:{id:id,name:name,price:price,can_select:false}})
                           }}>添加购物车</button>
                    </div>
                    {/* )
                })
            } */}
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