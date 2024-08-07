import { utilService } from "../util.service.js"
import { storageService } from "../async-storage.service.js"

const DB_USERS = 'DB_USERS'
const DB_CURR_USER = 'DB_CURR_USER'

export const authService = { login, signup, logout }

async function signup(user) {
    user.createdAt = new Date()
    user._id = utilService.makeId()
    await storageService.post(DB_USERS, user)
    _setLoggedInUser(user)

}

async function login(userToLogin) {
    const users = await storageService.query(DB_USERS)
    const foundUser = users.find(user => user.password === userToLogin.password && user.username === userToLogin.username)
    if (!foundUser) return Promise.reject('Cannot find user')
    return _setLoggedInUser(foundUser)
}

function logout() {
    sessionStorage.clear()
    return Promise.resolve()
}

function _setLoggedInUser(user) {
    const userToSave = { fullname: user.fullname, _id: user._id, isAdmin: user.isAdmin, reviews: user.reviews }
    sessionStorage.setItem(DB_CURR_USER, JSON.stringify(userToSave))
    return userToSave
}

