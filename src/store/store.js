import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { toyReducer } from "./reducers/toy.reducer"
import { userReducer } from "./reducers/user.reducer"
import { reviewReducer } from "./reducers/review.reducer"
import { authReducer } from "./reducers/auth.reducer"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    reviewModule: reviewReducer,
    authModule: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
