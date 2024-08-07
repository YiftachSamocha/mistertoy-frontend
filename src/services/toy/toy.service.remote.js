import { store } from "../../store/store.js"
import { httpService } from "../http.service.js"


export const toyService = { query, getById, reomve, save}

const BASE_URL = 'toy/'

const filterBy = store.getState().toyModule.filterBy

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

async function getById(toyId) {
    let toy = await httpService.get(BASE_URL + toyId)
    toy = _setNextPrevToyId(toy)
    return toy
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

async function _setNextPrevToyId(toy) {
    const toys = await httpService.get(BASE_URL, filterBy)
    const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
    const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
    const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
    toy.nextToyId = nextToy._id
    toy.prevToyId = prevToy._id
    return toy
}