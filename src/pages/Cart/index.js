import React from 'react';

import { Menu, Icon,Button,Modal,message} from 'antd';

import './Cart.scss'

import {connect} from 'react-redux'
import { fail } from 'assert';
const { confirm } = Modal;

class Cart extends React.Component{
    constructor(){
        super();
        this.state={
            navs:[
                {name:"alllist",path:"/alllist",title:"全部订单"},
                {name:"weilist",path:"/weilist",title:"待付款"},
                {name:"mlist",path:"/mlist",title:"处理中"},
                {name:"donelist",path:"/donelist",title:"已确认"},
                {name:"backlist",path:"/backlist",title:"已退订"}
              ],
            golist:[],
            current: 'alllist',
            display_block:'block',
            display_none:'none',
            nane:''

        }
        //改变this指向
        this.fail=this.fail.bind(this)
        this.showConfirm=this.showConfirm.bind(this)
        this.goto=this.goto.bind(this)
    }
    handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };



      fail(name){
        //   console.log(1111);
        //   if(window.confirm('确定要取消此次订单嘛'))
        //   alert('订单已取消')
        //   console.log('this',this);
         var r=window.confirm('确定要取消此次订单嘛')
         if (r==true)
     {
  alert("订单已取消");
  console.log('this',this);
  let{cartlist}=this.props;
   cartlist.map(item=>{
       if(item.name==name){
          item.can_select=true
       }
       
      })
    this.setState({
        // display_block:'none',
        display_none:'block',
        nane:name
    })

  }
else
  {
  
  }
}
//点击删除订单事件
showConfirm(name) {
    let {dispatch}=this.props
    confirm({
      title: '删除订单?',
      content: '确定删除订单吗？删除后订单将不可恢复',
      onOk() {
        console.log('OK');
      //删除订单
        dispatch({type:'remove_from_cart',payload:name})
        //删除成功提示
        message.success('删除成功');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  //跳转订单详情页
  goto(id){
      console.log('id',id)
      console.log(123);
      console.log('goto',this.props);
      let {history}=this.props;
      console.log(history)
    //   history.push({
    //     pathname: '/cartlist',
    //     search: '?id='+id,
    //     state: { pric1e: 998 }
    //   })
      history.push('/cartlist/'+id)
  }
// componentWillMount(){
//       //遍历出redux中的数据
//       let{cartlist}=this.props
//       this.setState({
//           golist:cartlist
//       })
// }
    render(){
        let {navs,current,golist} = this.state;

        console.log('cart.props',this.props);
        //遍历出redux中的数据
        let{cartlist}=this.props
      

        return(
            <div className='cartindex'>
                <div className='carthead'>
                    <h2>我的订单</h2>
                    <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                    {
                        navs.map(item=>{
                            return(
                                <Menu.Item key={item.name}>
                               {item.title}
                              </Menu.Item>  
                            )
                        })
                    }
                    </Menu>
                </div>
                {
                    cartlist.map(item=>{
                        return(
                            <div className='cartbody' key={item.name} className={item.can_select?'cartbody opac':'cartbody'} >
                            <div className='cartbody-item'>
                               <div className='cartbody-head'>
                                   <div className=' cartbody-color'>
                                     <span>未支付</span>
                                     <span>￥{item.price}</span>
                                  </div>
                                  <div className='cartbody-flex'>
                                     <span>订单号: 1203343</span>
                                     <span>请在20:27前支付</span>
                                  </div>
                             </div>
                             <div className='cartbody-body'onClick={this.goto.bind(this,item.id)}>
                                 <h3> {item.name}</h3>
                                 <div>
                                     <p className='gp'>出行日期：2019-08-14</p>
                                     <p className='gp'>购买数量：出行人 x 1  </p>
                                     </div>
                             </div>
                             <div className='cartbody-foot'>
                                     <button onClick={this.fail.bind(this,item.name)}  className={item.can_select?'none fail':'fail'}>取消订单</button>
                                     <button className={item.can_select?'none fail succ':' fail succ'}>去支付</button>
                                     {/* <Button onClick={showConfirm}>Confirm</Button> */}
                                     <Button  size='large' className={item.can_select?'cartdel':'none'} onClick={this.showConfirm.bind(this,item.name)}><Icon type="delete" /><span>删除订单</span></Button>
                                 </div>
                                 
                           </div>
                     </div>  
                        )
                    })
                }
             
            
            </div>
        )
    }
}

Cart=connect((state)=>{
    return{
        cartlist:state.goodslist
    }
})(Cart)
export default Cart;