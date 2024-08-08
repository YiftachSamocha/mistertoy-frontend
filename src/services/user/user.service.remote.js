import { httpService } from "../http.service.js"

export const userService = { query, getById, reomve, save}

const BASE_URL = 'user/'


function query() {
    return httpService.get(BASE_URL)
}

async function getById(userId) {
    return await httpService.get(BASE_URL + userId)
}

function reomve(userId) {
    return httpService.delete(BASE_URL + userId)
}

function save(user) {
    if (user._id) {
        return httpService.put(BASE_URL, user)
    }
    else {
        return httpService.post(BASE_URL, user)
    }
}


