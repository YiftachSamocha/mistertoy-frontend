import { userService as local } from "./user.service.local.js"
import { userService as remote} from "./user.service.remote.js"

const { VITE_LOCAL } = import.meta.env

const service = VITE_LOCAL === 'true' ? local : remote
 export const userService = {  ...service }