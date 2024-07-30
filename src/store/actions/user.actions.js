import { userService } from "../../services/user.service.js";
import { SET_USER } from "../reducers/user.reducer.js";
import { store } from "../store.js";

export async function signup(user) {
    try {
        const loggedInUser = await userService.signup(user)
        store.dispatch({ type: SET_USER, loggedInUser })
    }
    catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function login(user) {
    try {
        const loggedInUser = await userService.login(user)
        store.dispatch({ type: SET_USER, loggedInUser })
    }
    catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, loggedInUser: null })
    }
    catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}