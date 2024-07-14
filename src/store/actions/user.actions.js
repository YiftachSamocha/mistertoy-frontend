import { userService } from "../../services/user.service.js";
import { SET_USER } from "../reducers/user.reducer.js";
import { store } from "../store.js";

export function signup(user) {
    return userService.signup(user)
        .then(loggedInUser => store.dispatch({ type: SET_USER, loggedInUser }))
        .catch((err) => {
            console.log('Cannot signup', err)
            throw err
        })
}

export function login(user) {
    return userService.login(user)
        .then(loggedInUser => store.dispatch({ type: SET_USER, loggedInUser }))
        .catch((err) => {
            console.log('Cannot login', err)
            throw err
        })

}

export function logout() {
    return userService.logout()
        .then(() => store.dispatch({ type: SET_USER, loggedInUser: null }))
        .catch((err) => {
            console.log('Cannot logout', err)
            throw err
        })

}