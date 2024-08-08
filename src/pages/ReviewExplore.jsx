import { useEffect, useState } from "react";
import { reviewService } from "../services/review";

export function ReviewExplore(){
    const [reviews, setReviews]= useState([])
    const filterBy= {}
    useEffect(()=>{
        reviewService.query(filterBy)
        .then(foundReviews=> setReviews(foundReviews))
    },[])
    console.log(reviews)

    return <section className="reviews-explore">
        <h1>Reviews</h1>
        <div>
            {reviews.map(review=>{
                return <div className="review-preview" key={review._id}>
                    <h2>By User: {review.byUser.fullname}</h2>
                    <h2>About Toy: {review.aboutToy.name}</h2>
                    <p>{review.txt}</p>
                </div>
            })}
        </div>
    </section>
}