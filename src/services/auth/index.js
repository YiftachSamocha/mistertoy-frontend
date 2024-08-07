import { authService as local } from "./auth.service.local"
import { authService as remote } from "./auth.service.remote"
const { VITE_LOCAL } = import.meta.env

const DB_CURR_USER = 'DB_CURR_USER'
function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(DB_CURR_USER))
}

const service = VITE_LOCAL === 'true' ? local : remote
export const authService = { getLoggedinUser, ...service }



