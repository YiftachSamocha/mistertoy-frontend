import { userService } from "../../services/user.service.js"

const initialState = {
    loggedInUser: userService.getLoggedinUser()
}
export const SET_USER = 'SET_USER'

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedInUser: action.loggedInUser }
        default:
            return state
    }
}