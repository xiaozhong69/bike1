import * as type from '../actionName';

export function switchMenu(menuName) {
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}