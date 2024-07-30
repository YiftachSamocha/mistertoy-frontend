import { toyService } from "../../services/toy.service.js";
import { ADD_TOY, EDIT_TOY, REMOVE_TOY, SET_TOYS } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export async function loadToys(filterBy) {
    const toys = await toyService.query(filterBy)
    store.dispatch({ type: SET_TOYS, toys })
}

export async function removeToy(toyId) {
    await toyService.reomve(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
}

export async function saveToy(toy) {
    const type = toy._id ? EDIT_TOY : ADD_TOY
    await toyService.save(toy)
    store.dispatch({ type, toy })
}

