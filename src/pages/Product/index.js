import React, { Component, Fragment } from 'react';
import { Carousel, Icon } from 'antd';
import {connect} from 'react-redux';
import { api } from '../../utils';
import './Product.scss';
class Product extends Component {
    constructor() {
        super();
        this.state = {
            itemList: [],
            sliders: [],
            hotelname: '',
            tags: [],
            price: '',
            id:''
        }


    }
    async componentDidMount() {
        let { data: { data } } = await api.get('/info');

        let itemList = data[0].itemList[0];
        let sliders = data[0].itemList[0].images.sliders;
        let tags = data[0].itemList[0].tags;
        this.setState({
            itemList,
            sliders,
            hotelname: itemList.description.name,
            tags,
            price: itemList.show_prices,
            description: itemList.description.description[0],
           id:itemList.product_id
        })
        console.log(itemList);
        console.log(sliders);


    }
    render() {
        let { itemList, sliders, hotelname, tags, price, description,id } = this.state;
        console.log(tags);
  let {dispatch}=this.props
  console.log('prop.props',this.props);
  
        return (
            <Fragment>
                <div className={tags.length > 0 ? 'box' : 'none'}>
                    <div className='sliders'>
                        <div className='product_title'>
                            <h3>{itemList.supplier_product_id}</h3>
                        </div>

                        <Carousel autoplay >
                            {
                                sliders.map((item, idx) => <div key={idx}>
                                    <img src={item.image_url} alt="item.title" />
                                </div>
                                )
                            }
                        </Carousel>
                    </div>
                    <div className='product_info'>
                        <div className='hotelName'>
                            <p> {
                                hotelname
                            }</p>
                        </div>
                        <div className='tags'>
                            {

                                tags.map((item, idx) => {
                                    return (
                                        <span key={idx} className="tag">{item.tag.name}</span>
                                    )


                                })
                            }
                        </div>
                        <div className='price'>
                            <em>{price.price}</em>
                            <span>元起/份</span>
                            <span className='salse'>已售{itemList.sales_num}</span>
                        </div>

                    </div>


                    <div className='hightlight'>
                        <h4>产品亮点</h4>
                        <p>{description}</p>
                    </div>
                    <div className='buy_button'>
                        <div className='help'>
                            <Icon type="message" style={{ width: '100%' }} />
                            <p>咨询</p>
                        </div>
                        <div className='buy' onClick={()=>{
                       dispatch({type:'add_to_cart',payload:{id:id,name:hotelname,price:price.price,can_select:false}})         
                            }} >
                            <p>立即购买</p>
                        </div>

                    </div>
                </div>
                <div className={tags.length > 0 ? 'none' : 'loading'}>
                    加载中...
         </div>
            </Fragment>
        )

    }


}

Product=connect((state)=>{
    return{
        list:state.goodslist
    }
})(Product)
export default Product;