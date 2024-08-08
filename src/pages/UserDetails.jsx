import { loadReviews, removeReview } from "../store/actions/review.actions.js"
import { userService } from "../services/user/index.js"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { authService } from "../services/auth/index.js"
import { useSelector } from "react-redux"


export function UserDetails() {
    const [user, setUser] = useState(authService.getLoggedinUser())
    const reviews = useSelector(state => state.reviewModule.reviews)
    const userId = useParams().id
    useEffect(() => {
        userService.getById(userId)
            .then(foundUser => setUser(foundUser))
            .then(() => loadReviews(user._id))
    }, [])


    async function onRemoveReview(reviewId) {
        await removeReview(reviewId)

    }
    if (!user) return <div>Log in to watch your reviews!</div>
    return <section className="user-details">
        <h1>{user.fullname}: Reviews</h1>
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