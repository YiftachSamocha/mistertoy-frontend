import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const DB_USERS = 'DB_USERS'
const DB_CURR_USER = 'DB_CURR_USER'
export const userService = { login, signup, logout, getLoggedinUser }

function signup(user) {
    user.createdAt = new Date()
    user._id = utilService.makeId()
    return storageService.post(DB_USERS, user)
        .then(() => _setLoggedInUser(user))

}

function login(userToLogin) {
    return storageService.query(DB_USERS)
        .then(users => {
            const foundUser = users.find(user => user.password === userToLogin.password && user.username === userToLogin.username)
            if (!foundUser) return Promise.reject('Cannot find user')
            return _setLoggedInUser(foundUser)
        })
}

function logout() {
    sessionStorage.clear()
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(DB_CURR_USER))
}



function _setLoggedInUser(user) {
    const userToSave = { fullname: user.fullname, _id: user._id }
    sessionStorage.setItem(DB_CURR_USER, JSON.stringify(userToSave))
    return userToSave
}