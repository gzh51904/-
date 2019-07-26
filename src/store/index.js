

import {createStore} from 'redux'

import reducer from './reducer'

//创建store
//定义state的修改逻辑，reducer

let store=createStore(reducer)

export default store;