import { userService as local } from "./user.service.local"
import { userService as remote } from "./user.service.remote"
const { VITE_LOCAL } = import.meta.env

const DB_CURR_USER = 'DB_CURR_USER'
function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(DB_CURR_USER))
}

const service = VITE_LOCAL === 'true' ? local : remote
export const userService = { getLoggedinUser, ...service }



