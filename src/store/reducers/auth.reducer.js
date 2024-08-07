import { authService } from "../../services/auth"
const currUser = authService.getLoggedinUser()
const initialState = {
    loggedInUser: currUser,
    isAdminLogged: currUser ? currUser.isAdmin : false
}
export const SET_USER = 'SET_USER'
export const SET_IS_ADMIN_LOGGED = 'SET_IS_ADMIN_LOGGED'

export function authReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedInUser: action.loggedInUser, isAdminLogged: action.isAdminLogged }

        default:
            return state
    }
}