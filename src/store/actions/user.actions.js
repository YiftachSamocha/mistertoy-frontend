import { userService } from "../../services/user/index.js";
import { ADD_USER, EDIT_USER, REMOVE_USER, SET_USERS } from "../reducers/user.reducer.js";
import { store } from "../store.js";

export async function loadUsers(filterBy) {
    const users = await userService.query(filterBy)
    store.dispatch({ type: SET_USERS, users })
}

export async function removeUser(userId) {
    await userService.reomve(userId)
    store.dispatch({ type: REMOVE_USER, userId })
}

export async function saveUser(user) {
    const type = user._id ? EDIT_USER : ADD_USER
    await userService.save(user)
    store.dispatch({ type, user })
}


