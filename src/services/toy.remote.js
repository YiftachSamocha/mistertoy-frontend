import { httpService } from "./http.service.js"
import { store } from "../store/store.js"

export const toyService = { query, getById, reomve, save, getDefaultFilter, getEmptyToy, getLabels }

const BASE_URL = 'toy/'

const filterBy = store.getState().toyModule.filterBy

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function reomve(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    }
    else {
        return httpService.post(BASE_URL, toy)
    }
}


function getDefaultFilter() {
    return { name: '', inStock: 'all', labels: [], sort: 'name' }
}

function getEmptyToy() {
    return {
        name: '',
        price: 50,
        labels: [],
        createdAt: new Date(),
        inStock: false,
        color: '#ffffff',

    }
}

function getLabels() {
    return [
        "Doll", "Battery Powered", "Baby", "Educational", "Outdoor",
        "Collectible", "Soft", "Interactive", "Puzzle", "Remote Controlled",
        "Wooden", "Plastic", "Electronic", "Handcrafted", "Light-Up",
        "Musical", "Stuffed", "Ride-On", "Sports", "Creative"
    ]
}

function _setNextPrevToyId(toy) {
    return httpService.get(BASE_URL, filterBy)
        .then((toys) => {
            const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
            const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
            const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
            toy.nextToyId = nextToy._id
            toy.prevToyId = prevToy._id
            return toy
        })
}