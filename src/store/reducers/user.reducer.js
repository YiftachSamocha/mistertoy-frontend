import { userService } from "../../services/user.service.js"

const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    isAdminLogged: userService.getLoggedinUser() ? userService.getLoggedinUser().isAdmin : false
}
export const SET_USER = 'SET_USER'
export const SET_IS_ADMIN_LOGGED = 'SET_IS_ADMIN_LOGGED'

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedInUser: action.loggedInUser, isAdminLogged: action.isAdminLogged }

        default:
            return state
    }
}