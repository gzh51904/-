import React from 'react';
import { Steps ,Icon} from 'antd';
import {connect} from 'react-redux';
import './cartlist.scss'
const { Step } = Steps;
class Cartlist extends React.Component{
   
    render(){
        console.log('dess',this.props);
        let {list}=this.props
        
        
        return(
            <div>
                <div className='order-head'>
                    <div className='order-title'>
                   {list[0].name}
                        </div>
                        <div className='order-num-date'>
                                     <p className='gp'>出行日期：2019-08-14</p>
                                     <p className='gp'>订单日期: 2019-07-25 17:33:11</p>
                        </div>
                    <div className='cartbody-flexcolor'>
                                     <span className='wei'>未支付</span>
                                     <span  className='time'>请在2019-07-25 18:03:11前支付</span>
                    </div>
                    <div className='step'>  
                    <Steps progressDot current={1} >
                <Step icon={<Icon type="check" /> } status="finish" description="下单" />
                <Step icon={<Icon type="solution" />} status="finish" description="付款" />
                <Step  description="预定处理中" />
                <Step  description="已出票/发货 " />
            </Steps>
                </div>
                <span className='pay-btn'>去支付</span>
                </div>
                <div className='order-group'>
                <div className='order-dess'>
                    订单信息
                </div>
                <div className='order-list-row'>
                <div className='order-order' >
                    <p className='order-p'>订单信息
                    <Icon type="bars"  className='order-icon'/>
                    </p>
                    <p>日期: 2019-08-14</p>
                    <p>数量: <span>出行人 x 1  </span></p>
                    <p>套餐选择: 往返机票+2晚轻井泽虹夕诺雅+2晚东京椿山庄酒店</p>
                </div>
                <div className='order-order' >
                    <p className='order-p'>联系人信息
                    <Icon type="user"  className='order-icon'/>
                    </p>
                    <p>姓名: 1</p>
                    <p>电话: <span>66666666666 </span></p>
                    <p>邮箱: 66666@163.com</p>
                </div>
                <div className='order-order' >
                    <p className='order-p'>出行人
                    <Icon type="user"  className='order-icon'/>
                    </p>
                    <p>中文姓名: 1</p>
                    <p>拼音: <span>66666666666 </span></p>
                </div>
                </div>
                {/* 价格明细 */}
                <div className='order-dess'>
                    价格明细
                </div>
                <div className='order-list-row'>
                <div className='order-order' >
                    <p className='order-p'>价格明细
                    <Icon type="dollar"  className='order-icon'/>
                    </p>
                    <p>日期: 2019-08-14</p>
                    <p>数量: <span>出行人 x 1  </span></p>
                    <p className='pri'><span>总额</span><span className='topri'>￥{list[0].price}</span></p>
                </div>
                </div>
                {/* 使用信息及退还 */}
                <div className='order-dess'>
                    使用信息及退还
                </div>
                <div className='order-list-row'>
                <div className='order-order' >
                    <p className='order-p'>退还政策
                    <Icon type="profile"  className='order-icon'/>
                    </p>
                    <p>该商品下单后将不允许退订</p>
                </div>
                <div className='order-order' >
                    <p className='order-p'>联系电话
                    <Icon type="phone"  className='order-icon'/>
                    </p>
                    <p>玩途当地电话：400-660-0010（中文）</p>
                </div>
                </div>
                {/* 需要帮助 */}
                <div className='order-dess'>
                    需要帮助
                </div>
                <div className='order-list-row'>
                <div className='order-order' >
                    <p className='order-p'> 国内 400-660-0010 
                    <Icon type="phone"  className='order-icon'/>
                    </p>
                    <p className='order-p tell'>  国际 0086-21-61515220 
                    <Icon type="phone"  className='order-icon'/>
                    </p>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
Cartlist=connect((state)=>{
        return{
            list:state.goodslist
        }
})(Cartlist)
export default Cartlist;