import { store } from "../../store/store.js"
import { httpService } from "../http.service.js"

export const reviewService = { query, getById, reomve, save}

const BASE_URL = 'review/'

const filterBy = store.getState().toyModule.filterBy

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

async function getById(reviewId) {
    return await httpService.get(BASE_URL + reviewId)
}

function reomve(reviewId) {
    return httpService.delete(BASE_URL + reviewId)
}

function save(review) {
    if (review._id) {
        return httpService.put(BASE_URL, review)
    }
    else {
        return httpService.post(BASE_URL, review)
    }
}

