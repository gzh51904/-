import React,{Component} from 'react';
// import './App.css';
import {Switch,Route,Redirect,withRouter} from "react-router-dom";
import { Menu, Icon,Badge  } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';


import Discover from './pages/Discover';
import List from './pages/List';
import Cart from './pages/Cart';
import Mine from './pages/Mine/index.jsx';
import Goods from './pages/Goods';
import My from "./pages/Mine/My/index.jsx";

import Routers from './routerMap.jsx'

import "./App.css"
class App extends Component{
  constructor(){
    super();
    this.state={
      navs:[
        {name:"Discover",path:"/discover",ico:"fire",title:"发现"},
        {name:"List",path:"/list",ico:"bars",title:"目的地"},
        {name:"Cart",path:"/cart",ico:"shopping-cart",title:"订单"},
        {name:"My",path:"/mine",ico:"user",title:"我的"}
      ],
      current:'Discover'
    }
  this.handleClick=this.handleClick.bind(this);  
  }
  componentWillMount() {
    // 刷新高亮
    let url = this.props.location.pathname.slice(1, 2).toUpperCase() + this.props.location.pathname.slice(2)
    this.setState({
      current: url
    })
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
    let token = this.props.token;
    return(
      <div className="App">

        <div className="App-main">
         {/* 路由信息 */}
          <Switch>
            {/* 路由拦截 */}
          {/* {Routers.map((item, index) => {
              return <Route key={index} path={item.path} exact render={props =>
                (!item.auth ? (<item.component {...props} />) : (token ? <item.component {...props} /> : <Redirect to={{
                  pathname: '/mine',
                  state: { from: props.location }
                }} />)
                )} />
            })} */}
            <Route path="/discover" component={Discover} />
            <Route path="/list" component={List} />
            <Route path="/cart" component={Cart} />
            <Route path="/mine" component={Mine} />     
            <Route path="/goods:id" component={Goods}></Route>
            <Route path="/my" component={My} />
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
