import React,{Component} from 'react';
// import './App.css';
import {Switch,Route,Redirect,withRouter} from "react-router-dom";
import { Menu, Icon,Badge  } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';


import Discover from './pages/Discover/index.jsx';
import List from './pages/List';
import Cart from './pages/Cart';
import Mine from './pages/Mine/index.jsx';
import Goods from './pages/Goods';


import "./App.css"
class App extends Component{
  constructor(){
    super();
    this.state={
      navs:[
        {name:"Discover",path:"/discover",ico:"fire",title:"发现"},
        {name:"List",path:"/list",ico:"bars",title:"目的地"},
        {name:"Cart",path:"/cart",ico:"shopping-cart",title:"订单"},
        {name:"Mine",path:"/mine",ico:"user",title:"我的"}
      ],
      current:'Discover'
    }
  this.handleClick=this.handleClick.bind(this);  
  }

  handleClick(data){
    // console.log(data);
    this.setState({
      current:data.key
    })
    // 路由跳转
    // 获取点击的路由路径
    let currentRouter = this.state.navs.filter(item=>item.name===data.key)[0];
    this.props.history.push(currentRouter.path);
  }

  render(){
    let {navs,current} = this.state;
    return(
      <div className="App">

        <div className="App-main">
         {/* 路由信息 */}
          <Switch>
            <Route path="/discover" component={Discover} />
            <Route path="/list" component={List} />
            <Route path="/cart" component={Cart} />
            <Route path="/mine" component={Mine} />     
            <Route path="/goods:id" component={Goods}></Route>
            <Redirect from='/' to='/discover' exact></Redirect>
          </Switch>
        </div>

        <div className="App-foot">
          <Menu  className="Menu" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" >
          {
            navs.map(item=>(              
                <Menu.Item  className="Menu-item" key={item.name} >
                  <Icon className="Menu-icon" type={item.ico} />
                  {item.title}
                </Menu.Item>
            ))
          }
          </Menu>

        </div>     
      </div>
    )
  }
}
App = withRouter(App);

export default App;
