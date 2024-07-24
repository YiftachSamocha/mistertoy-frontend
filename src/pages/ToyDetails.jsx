import { Link, useParams } from "react-router-dom"
import { utilService } from "../services/util.service.js"
import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"

export function ToyDetails() {
    const [toy, setToy] = useState({})
    const toyId = useParams().id
    useEffect(() => {
        toyService.getById(toyId)
            .then(foundToy => setToy(foundToy))
    }, [toyId])
    if (!toy || Object.keys(toy).length === 0) return <div className="no-toy">Loading...</div>

    return <section className="toy-details" >
        <section style={{ backgroundColor: toy.color }}>
            <div className="nav-toy-details">
                <Link to={'/toy/' + toy.prevToyId}><button><i className="fa-solid fa-arrow-left"></i></button></Link>
                <Link to={'/toy/' + toy.nextToyId}><button><i className="fa-solid fa-arrow-right"></i></button></Link>
            </div>
            <h1>{toy.name}</h1>
            <h2>Price: {toy.price}₪</h2>
            <p>Labels:</p>
            {toy.labels.map(label => {
                return <div className="label" key={utilService.makeId()}>{label}</div>
            })}

            <p>{toy.inStock ? 'In stock!' : 'Not in stock...'}</p>
        </section>
        <div className="back-btn"><Link to={'/toy'}><button>Back to page</button></Link></div>
    </section>
}