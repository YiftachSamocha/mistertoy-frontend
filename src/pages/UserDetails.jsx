import { removeReview } from "../store/actions/review.actions.js"
import { saveToy } from "../store/actions/toy.actions"
import { userService } from "../services/user/index.js"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { authService } from "../services/auth/index.js"

export function UserDetails() {
    const [user, setUser] = useState(authService.getLoggedinUser())
    const userId = useParams().id
    useEffect(() => {
        userService.getById(userId)
            .then(foundUser => setUser(foundUser))
    }, [])
    const reviews = user.reviews

    async function onRemoveReview(review) {
        await removeReview(review._id)
        await saveToy()
    }
    return <section>
        <h1>{user.fullname}</h1>
        <div>
            {reviews.map(review => {
                return <div key={review._id}>
                    <h2>{review.toyId}</h2>
                    <p>{review.txt}</p>
                    <button onClick={() => onRemoveReview(review._id)}>X</button>
                </div>
            })}
        </div>

    </section>
}