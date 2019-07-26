import React,{Component} from 'react';
// import './App.css';
import {Switch,Route,Redirect,withRouter} from "react-router-dom";
import { Menu, Icon } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';


import Discover from './pages/Discover/index.jsx';
import List from './pages/List';
import Cart from './pages/Cart';
import Mine from './pages/Mine/index.jsx';
import Goods from './pages/Goods';
import Dest from './pages/Dest';
import Cartlist from './pages/Cartlist';
import My from "./pages/Mine/My/index.jsx";
import Peo from "./pages/Mine/My/Address/index.jsx"
import axios from 'axios';



import "./App.css";
let lanjie=localStorage.getItem("Authorization")
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

    // 请求拦截
axios.interceptors.request.use(config => {
  //每次利用axios发起的请求会进入这里
  // 添加token
  let token = localStorage.getItem("Authorization");
  if (config.url != "http://18.139.229.218:1904/login") {
      config.headers.Authorization = token;
  }
  return config;
}, error => {
  // 失败的回调
  return Promise.reject(error);
});

// 响应拦截：校验token
axios.interceptors.response.use(response => {
if(response.data.code==401){
  this.props.history.push("/mine")
}
return response;
},error => {
// Do something with response error
return Promise.reject(error);
});
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
    const { location: { pathname } } = this.props;
    // 需要点击隐藏的路由全部放在下面的数组里面
    const hideFooterPath = ['/peo',]
    const hideFooter = hideFooterPath.includes(pathname.trim())

   
    
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
            <Route path="/dest" component={Dest}></Route>
            <Route path="/cartlist/:id" component={Cartlist}></Route>
            <Route path="/my" component={My} />
            <Route path="/peo" component={Peo} />

            <Redirect from='/' to='/discover' exact></Redirect>
          </Switch>
        </div>

        <div className="App-foot">{
            hideFooter ? null :<Menu  className="Menu" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" >
            {
              navs.map(item=>(              
                  <Menu.Item  className="Menu-item" key={item.name} >
                    <Icon className="Menu-icon" type={item.ico} />
                    {item.title}
                  </Menu.Item>
              ))
            }
            </Menu>
        }
          

        </div>     
      </div>
    )
  }
}
App = withRouter(App);

export default App;
