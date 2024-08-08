import { httpService } from "../http.service.js"
export const authService = { login, signup, logout }
const BASE_URL = 'auth/'
const DB_CURR_USER = 'DB_CURR_USER'

async function login(user) {
    const userToSave = await httpService.post(BASE_URL + 'login', user)
    if (!userToSave) return Promise.reject('Cannot login')
    return _setLoggedInUser(userToSave)
}


async function signup(user) {
    const userToSave = await httpService.post(BASE_URL + 'signup', user)
    if (!userToSave) return Promise.reject('Cannot signup')
    return _setLoggedInUser(userToSave)
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.clear()
}

function _setLoggedInUser(user) {
    const userToSave = { fullname: user.fullname, _id: user._id, isAdmin: user.isAdmin, reviews: user.reviews || [] }
    sessionStorage.setItem(DB_CURR_USER, JSON.stringify(userToSave))
    return userToSave
}



