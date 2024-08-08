import { saveToy } from "../store/actions/toy.actions.js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { authService } from "../services/auth/index.js"
import { loadReviews, removeReview, saveReview } from "../store/actions/review.actions.js"
import { saveUser } from "../store/actions/user.actions.js"


export function ToyReviews({ toy, setToy }) {
    const [isTextboxOpen, setIsTextboxOpen] = useState(false)
    const [txtReview, setTxtReview] = useState('')
    const reviews = useSelector(state => state.reviewModule.reviews)
    const isAdminLogged = useSelector(state => state.authModule.isAdminLogged)
    const currUser = useSelector(state => state.authModule.loggedInUser)

    useEffect(() => {
        loadReviews({ toy: toy._id })
    }, [])

    function handleChange({ target }) {
        const { value } = target
        setTxtReview(value)
    }


    async function addReview() {
        //Add to review data
        const reviewToReviewData = { txt: txtReview, userId: currUser._id, toyId: toy._id }
        const savedReview = await saveReview(reviewToReviewData)

        // Add to toy data
        const reviewToToyData = { _id: savedReview._id, txt: savedReview.txt, userId: savedReview.userId }
        const updatedToy = { ...toy, reviews: [...toy.reviews, reviewToToyData] }
        await saveToy(updatedToy)

        //Add to user data
        const reviewToUserData = { _id: savedReview._id, txt: savedReview.txt, toyId: savedReview.toyId }
        const updatedUser = { ...currUser, reviews: [...currUser.reviews, reviewToUserData] }
        await saveUser(updatedUser)
        await loadReviews()
        setTxtReview('')
        setIsTextboxOpen(prev => !prev)
    }
    async function onRemoveReview(reviewId) {
        //Remove from review
        await removeReview(reviewId)

        //Remove from toy
        const reviews = toy.reviews.filter(review => review.id !== reviewId)
        const updatedToy = { ...toy, reviews }
        await saveToy(updatedToy)
    }
    if (!currUser) return <div>Log in to add a review!</div>

    return <section className="reviews">
        <h3>Reviews:</h3>
        {reviews.length === 0 && <p>No reviews... Add one!</p>}
        <div>
            {reviews.map(review => {
                return <div className="toy-review" key={review.id}>
                    <h3>{review.byUser.fullname}</h3>
                    <p>{review.txt}</p>
                    {isAdminLogged && <button onClick={() => onRemoveReview(review.id)}><i className="fa-solid fa-trash"></i></button>}
                </div>
            })}
        </div>
        <label htmlFor="revies">Add Review</label>
        {isTextboxOpen ? <section>
            <textarea name="reviews" id="reviews" onChange={handleChange} value={txtReview}></textarea>
            <button onClick={addReview}>Submit</button>
        </section> : <button onClick={() => setIsTextboxOpen(prev => !prev)} className="add-review-btn">+</button>}
    </section>
}