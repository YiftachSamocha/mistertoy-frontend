import { httpService } from "./http.service.js"
export const userService = { login, signup, logout, getLoggedinUser }
const BASE_URL = 'auth/'
const DB_CURR_USER = 'DB_CURR_USER'

function login(user) {
    return httpService.post(BASE_URL + 'login', user)
        .then(userToSave => {
            if (!userToSave) return Promise.reject('Cannot login')
            return _setLoggedInUser(userToSave)
        })
}

function signup(user) {
    return httpService.post(BASE_URL + 'signup', user)
        .then(userToSave => {
            if (!userToSave) return Promise.reject('Cannot signup')
            return _setLoggedInUser(userToSave)
        })
}

function logout() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => sessionStorage.clear())
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(DB_CURR_USER))
}

function _setLoggedInUser(user) {
    const userToSave = { fullname: user.fullname, _id: user._id }
    sessionStorage.setItem(DB_CURR_USER, JSON.stringify(userToSave))
    return userToSave
}