import { reviewService as remote } from "./review.service.remote.js"
import { reviewService as local } from "./review.service.local.js"
const { VITE_LOCAL } = import.meta.env


const service = VITE_LOCAL === 'true' ? local : remote
export const reviewService = {  ...service }