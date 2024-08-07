
import { storageService } from "../async-storage.service.js"
import { utilService } from "../util.service.js"

export const reviewService = { query, getById, reomve, save}
const DB_REVIEWS = 'DB_REVIEWS'

async function query(filterBy = {}) {
    let reviews = await storageService.query(DB_REVIEWS)

    // if (filterBy.name) {
    //     reviews = reviews.filter(toy => toy.name.includes(filterBy.name))
    // }
    // if (filterBy.inStock) {
    //     if (filterBy.inStock === 'in') reviews = reviews.filter(toy => toy.inStock)
    //     else if (filterBy.inStock === 'out') reviews = reviews.filter(toy => !toy.inStock)
    // }
    // if (filterBy.labels.length !== 0) {
    //     reviews = reviews.filter(toy =>
    //         filterBy.labels.some(label => toy.labels.includes(label)))

    // }
    // if (filterBy.sort) {
    //     switch (filterBy.sort) {
    //         case 'name':
    //             reviews = reviews.sort((a, b) => a.name.localeCompare(b.name))
    //             break
    //         case 'price':
    //             reviews = reviews.sort((a, b) => a.price - b.price)
    //             break
    //         case 'date':
    //             reviews = reviews.sort((a, b) => a.createdAt - b.createdAt)
    //             break
    //     }
    // }
    return reviews
}

function save(reviewToSave) {
    if (reviewToSave._id) {
        return storageService.put(DB_REVIEWS, reviewToSave)
    }
    else {
        return storageService.post(DB_REVIEWS, reviewToSave)
    }
}

async function getById(reviewId) {
    return await storageService.get(DB_REVIEWS, reviewId)
}

function reomve(reviewId) {
    return storageService.remove(DB_REVIEWS, reviewId)
}



