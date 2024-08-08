import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadReviews, removeReview } from "../store/actions/review.actions.js";
import { loadToys, saveToy } from "../store/actions/toy.actions";
import { loadUsers } from "../store/actions/user.actions";

export function ReviewExplore() {
    const reviews = useSelector(state => state.reviewModule.reviews)
    const users = useSelector(state => state.userModule.users)
    const toys = useSelector(state => state.toyModule.toys)
    const currUser = useSelector(state => state.authModule.loggedInUser)
    const [filterBy, setFilterBy] = useState({ txt: '', toy: '', user: '' })

    useEffect(() => {
        loadReviews(filterBy)
            .then(() => loadToys())
            .then(() => loadUsers())
    }, [filterBy])
    function handleChange({ target }) {
        const { value, name } = target
        setFilterBy({ ...filterBy, [name]: value })
    }
    function isDeleteable(review) {
        if(!currUser) return false
        if (currUser.isAdmin) return true
        if (currUser._id === review.byUser._id) return true
        return false
    }

    async function onRemoveReview(reviewId) {
        //Remove from review
        await removeReview(reviewId)

        
        
    }

    return <section className="reviews-explore">
        <h1>Reviews</h1>
        <div className="reviews-filter">
            <div>
                <label htmlFor="txt">Text</label>
                <input type="text" name="txt" id="txt"
                    value={filterBy.txt} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="toy">Toy</label>
                <select name="toy" id="toy" value={filterBy.toy} onChange={handleChange}>
                    <option value=''>All</option>
                    {toys.map(toy => {
                        return <option value={toy._id} key={toy._id}>{toy.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label htmlFor="user">User</label>
                <select name="user" id="user" value={filterBy.user} onChange={handleChange}>
                    <option value=''>All</option>
                    {users.map(user => {
                        return <option value={user._id} key={user._id}>{user.fullname}</option>
                    })}
                </select>
            </div>
        </div>
        <div className="reviews-content">
            {reviews.map(review => {
                return <div className="review-preview" key={review._id}>
                    <h2>By User: {review.byUser.fullname}</h2>
                    <h2>About Toy: {review.aboutToy.name}</h2>
                    <p>{review.txt}</p>
                    {isDeleteable(review) && <button onClick={() => onRemoveReview(review._id)}><i className="fa-solid fa-trash"></i></button>}
                </div>
            })}
        </div>
    </section>
}