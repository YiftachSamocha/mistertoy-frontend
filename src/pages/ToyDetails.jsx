import { Link, useParams } from "react-router-dom"
import { utilService } from "../services/util.service.js"
import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { userService } from "../services/user.service.js"
import { useSelector } from "react-redux"

export function ToyDetails() {
    const [toy, setToy] = useState({})
    const [isTextboxOpen, setIsTextboxOpen] = useState(false)
    const [txtMsg, setTxtMsg] = useState('')
    const isAdminLogged = useSelector(state => state.userModule.isAdminLogged)
    const toyId = useParams().id

    useEffect(() => {
        toyService.getById(toyId)
            .then(foundToy => setToy(foundToy))
    }, [toyId])

    if (!toy || Object.keys(toy).length === 0) return <div className="no-toy">Loading...</div>

    function handleChange({ target }) {
        const { value } = target
        setTxtMsg(value)
    }

    async function addMsg() {
        const currMsg = {
            txt: txtMsg,
            id: utilService.makeId(),
            by: userService.getLoggedinUser() || { fullname: 'Anonymous', id: utilService.makeId() },
        }
        const msgs= [...toy.msgs, currMsg]
        const updatedToy= {...toy, msgs}
        setToy(updatedToy)
        await saveToy(toy)
        setTxtMsg('')
        setIsTextboxOpen(prev => !prev)
    }
    async function removeMsg(msgId) {
        const msgs = toy.msgs.filter(msg => msg.id !== msgId)
        const updatedToy= {...toy, msgs }
        setToy(updatedToy)
        await saveToy(toy)
    }

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
            <section className="msgs">
                <h3>Messages:</h3>
                {toy.msgs.length===0&& <p>No messages... Add one!</p>}
                <div>
                    {toy.msgs.map(msg => {
                        return <div className="toy-msg" key={msg.id}>
                            <h3>{msg.by.fullname}</h3>
                            <p>{msg.txt}</p>
                            {isAdminLogged && <button onClick={() => removeMsg(msg.id)}><i className="fa-solid fa-trash"></i></button>}
                        </div>
                    })}
                </div>
                <label htmlFor="msgs">Add Message</label>
                {isTextboxOpen ? <section>
                    <textarea name="msgs" id="msgs" onChange={handleChange} value={txtMsg}></textarea>
                    <button onClick={addMsg}>Submit</button>
                </section> : <button onClick={() => setIsTextboxOpen(prev => !prev)} className="add-msg-btn">+</button>}
            </section>


        </section>


        <div className="back-btn"><Link to={'/toy'}><button>Back to page</button></Link></div>
    </section>
}