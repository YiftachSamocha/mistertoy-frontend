import { saveToy } from "../store/actions/toy.actions.js"
import { useState } from "react"
import { useSelector } from "react-redux"
import { authService } from "../services/auth/index.js"
import { saveReview } from "../store/actions/review.actions.js"
import { saveUser } from "../store/actions/user.actions.js"


export function ToyReviews({ toy, setToy }) {
    const [isTextboxOpen, setIsTextboxOpen] = useState(false)
    const [txtReview, setTxtReview] = useState('')
    const isAdminLogged = useSelector(state => state.userModule.isAdminLogged)
    function handleChange({ target }) {
        const { value } = target
        setTxtReview(value)
    }


    async function addReview() {
        const currUser = authService.getLoggedinUser()
        //Add to review data
        const reviewToReviewData = { txt: txtReview, userId: currUser._id, toyId: toy._id }
        const savedReview = await saveReview(reviewToReviewData)

        // Add to toy data
        const reviewToToyData = { _id: savedReview._id, txt: savedReview.txt, userId: savedReview.userId }
        const updatedToy = { ...toy, reviews: [...toy.reviews, reviewToToyData] }
        setToy(updatedToy)
        await saveToy(updatedToy)

        //Add to user data
        const reviewToUserData = { _id: savedReview._id, txt: savedReview.txt, toyId: savedReview.toyId }
        const updatedUser = { ...currUser, reviews: [...currUser.reviews, reviewToUserData] }
        await saveUser(updatedUser)

        setTxtReview('')
        setIsTextboxOpen(prev => !prev)
    }
    async function removeReview(reviewId) {
        const reviews = toy.reviews.filter(review => review.id !== reviewId)
        const updatedToy = { ...toy, reviews }
        setToy(updatedToy)
        await saveToy(toy)
    }
    if (!authService.getLoggedinUser()) return <div>Log in to add a review!</div>

    return <section className="reviews">
        <h3>Reviews:</h3>
        {toy.reviews.length === 0 && <p>No reviews... Add one!</p>}
        <div>
            {toy.reviews.map(review => {
                return <div className="toy-review" key={review.id}>
                    {/* <h3>{review.by.fullname}</h3> */}
                    <p>{review.txt}</p>
                    {isAdminLogged && <button onClick={() => removeReview(review.id)}><i className="fa-solid fa-trash"></i></button>}
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