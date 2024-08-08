import { removeReview } from "../store/actions/review.actions.js"
import { saveToy } from "../store/actions/toy.actions"
import { userService } from "../services/user/index.js"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { authService } from "../services/auth/index.js"
import { reviewService } from "../services/review/index.js"

export function UserDetails() {
    const [user, setUser] = useState(authService.getLoggedinUser())
    const [reviews, setReviews] = useState([])
    const userId = useParams().id
    useEffect(() => {
        userService.getById(userId)
            .then(foundUser => setUser(foundUser))
            .then(() => reviewService.query({ user: user._id }))
            .then(userReviews => setReviews(userReviews))
    }, [])


    // async function onRemoveReview(review) {
    //     await removeReview(review._id)

    //     await saveToy()
    // }
    if (!user) return <div>Log in to watch your reviews!</div>
    return <section className="user-details">
        <h1>{user.fullname}</h1>
        <div>
            {reviews.map(review => {
                return <div key={review._id} className="user-review">
                    <h2>{review.aboutToy.name}</h2>
                    <p>{review.txt}</p>
                    {/* <button onClick={() => onRemoveReview(review._id)}><i className="fa-solid fa-trash"></i></button> */}
                </div>
            })}
        </div>

    </section>
}