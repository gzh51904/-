// 初始化出行人信息
let initState = {
    people: []
};
let reducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_PEOPLE":
            return {
                ...state,
                people: [action.payload, ...state.people]
            }
            default:
                return state
    }
}

export default reducer