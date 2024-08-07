import { saveToy } from "../store/actions/toy.actions.js"
import { userService } from "../services/user/index.js"
import { useState } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service.js"

export function ToyReviews({ toy, setToy }) {
    const [isTextboxOpen, setIsTextboxOpen] = useState(false)
    const [txtReview, setTxtReview] = useState('')
    const isAdminLogged = useSelector(state => state.userModule.isAdminLogged)
    function handleChange({ target }) {
        const { value } = target
        setTxtReview(value)
    }
    

    async function addReview() {
        const currMsg = {
            txt: txtReview,
            id: utilService.makeId(),
            by: userService.getLoggedinUser() || { fullname: 'Anonymous', id: utilService.makeId() },
        }
        const reviews = [...toy.reviews, currMsg]
        const updatedToy = { ...toy, reviews: reviews }
        setToy(updatedToy)
        await saveToy(updatedToy)
        setTxtReview('')
        setIsTextboxOpen(prev => !prev)
    }
    async function removeReview(reviewId) {
        const reviews = toy.reviews.filter(review => review.id !== reviewId)
        const updatedToy = { ...toy, reviews }
        setToy(updatedToy)
        await saveToy(toy)
    }

    return <section className="revies">
        <h3>Reviews:</h3>
        {toy.reviews.length === 0 && <p>No reviews... Add one!</p>}
        <div>
            {toy.reviews.map(review => {
                return <div className="toy-review" key={review.id}>
                    <h3>{review.by.fullname}</h3>
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