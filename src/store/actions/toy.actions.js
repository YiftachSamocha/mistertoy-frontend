import { toyService } from "../../services/toy.service.js";
import { ADD_TOY, EDIT_TOY, REMOVE_TOY, SET_TOYS } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export function loadToys(filterBy) {
    return toyService.query(filterBy)
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
}

export function removeToy(toyId) {
    return toyService.reomve(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
}

export function saveToy(toy) {
    const type = toy._id ? EDIT_TOY : ADD_TOY
    return toyService.save(toy)
        .then(() => store.dispatch({ type, toy }))
}

