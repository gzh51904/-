//初始化state

let initState={
    goodslist:[]
}



//reducer为纯函数，接收state和action，返回一个新的state，进行更新
//action解构可以有type和payload


let reducer=(state=initState,action)=>{

    switch(action.type){
    //store.dispatch({type:'add_to_cart',payload:{id,name,}})
        case 'add_to_cart':
        return{
            ...state,
            goodslist:[action.payload,...state.goodslist]
        }
        //store.dispatch({type:'remove_from_cart',payload:name})
        case 'remove_from_cart':
        return{
            ...state,
            goodslist:state.goodslist.filter(item=>item.name != action.payload)
        }
        default:
        return state
    }
     
}

export default reducer;