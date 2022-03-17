import * as actionType from '../actionName';
const initialState = {
    menuName:'首页'
}

export default (state = initialState,action) =>{
    switch (action.type){
        case actionType.SWITCH_MENU:
            return {
                ...state,
                menuName:action.menuName
            }
    }
}