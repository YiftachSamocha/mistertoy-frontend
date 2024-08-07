import { reviewService } from "../../services/review/index.js";
import { ADD_REVIEW, EDIT_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from "../reducers/review.reducer.js";

import { store } from "../store.js";

export async function loadReviews(filterBy) {
    const reviews = await reviewService.query(filterBy)
    store.dispatch({ type: SET_REVIEWS, reviews })
}

export async function removeToy(reviewId) {
   await reviewService.reomve(toyId)
    store.dispatch({ type: REMOVE_REVIEW, toyId: reviewId })
}

export async function saveToy(review) {
    const type = review._id ? EDIT_REVIEW : ADD_REVIEW
    await reviewService.save(toy)
    store.dispatch({ type, toy: review })
}

