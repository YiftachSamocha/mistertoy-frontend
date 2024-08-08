import { reviewService } from "../../services/review/index.js";
import { ADD_REVIEW, EDIT_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from "../reducers/review.reducer.js";

import { store } from "../store.js";

export async function loadReviews(filterBy) {
    const reviews = await reviewService.query(filterBy)
    store.dispatch({ type: SET_REVIEWS, reviews })
    return reviews
}

export async function removeReview(reviewId) {
    await reviewService.reomve(reviewId)
    store.dispatch({ type: REMOVE_REVIEW, reviewId })
}

export async function saveReview(review) {
    const type = review._id ? EDIT_REVIEW : ADD_REVIEW
    const savedReview = await reviewService.save(review)
    store.dispatch({ type, review: savedReview })
    return savedReview
}


