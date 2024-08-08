const initialState = {
    reviews: []
}

export const SET_REVIEWS = 'LOAD_REVIEWS'
export const REMOVE_REVIEW = 'REMOVE_REVIEW'
export const ADD_REVIEW = 'ADD_REVIEW'
export const EDIT_REVIEW = 'EDIT_REVIEW'



export function reviewReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_REVIEWS:
            return { ...state, reviews: action.reviews }

        case REMOVE_REVIEW:
            const filteredReviews = state.reviews.filter(review => review._id !== action.reviewId)
            return { ...state, reviews: filteredReviews }

        case ADD_REVIEW:
            const newReviews = [...state.reviews]
            newReviews.push(action.review)
            return { ...state, reviews: newReviews }

        case EDIT_REVIEW:
            const editedReviews = state.reviews.map(review => review._id === action.review._id ? action.review : review)
            return { ...state, reviews: editedReviews }


        default:
            return state
    }
}