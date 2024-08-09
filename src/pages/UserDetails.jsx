import { loadReviews, removeReview } from "../store/actions/review.actions.js"
import { userService } from "../services/user/index.js"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { setLoggedInUser } from "../store/actions/auth.actions.js"


export function UserDetails() {
    const currUser = useSelector(state => state.authModule.loggedInUser)
    const reviews = useSelector(state => state.reviewModule.reviews)
    const userId = useParams().id
    useEffect(() => {
        userService.getById(userId)
            .then(foundUser => setLoggedInUser(foundUser))
            .then(() => loadReviews({ user: currUser._id }))
    }, [])


    async function onRemoveReview(reviewId) {
        await removeReview(reviewId)

    }
    if (!currUser) return <div>Log in to watch your reviews!</div>
    if(!reviews || reviews.length===0) return <div>No reviews yet... Go and add one!</div>
    return <section className="user-details">
        <h1>{currUser.fullname}: Reviews</h1>
        <div>
            {reviews.map(review => {
                return <div key={review._id} className="user-review">
                    <h2>{review.aboutToy.name}</h2>
                    <p>{review.txt}</p>
                    <button onClick={() => onRemoveReview(review._id)}><i className="fa-solid fa-trash"></i></button>
                </div>
            })}
        </div>

    </section>
}