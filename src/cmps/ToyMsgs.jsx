import { saveToy } from "../store/actions/toy.actions.js"
import { authService } from "../services/auth/index.js"
import { useState } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service.js"


export function ToyMsgs({ toy, setToy }) {
    const [isTextboxOpen, setIsTextboxOpen] = useState(false)
    const [txtMsg, setTxtMsg] = useState('')
    const isAdminLogged = useSelector(state => state.userModule.isAdminLogged)
    function handleChange({ target }) {
        const { value } = target
        setTxtMsg(value)
    }

    async function addMsg() {
        const currMsg = {
            txt: txtMsg,
            id: utilService.makeId(),
            by: authService.getLoggedinUser() || { fullname: 'Anonymous', id: utilService.makeId() },
        }
        const msgs = [...toy.msgs, currMsg]
        const updatedToy = { ...toy, msgs }
        setToy(updatedToy)
        await saveToy(updatedToy)
        setTxtMsg('')
        setIsTextboxOpen(prev => !prev)
    }
    async function removeMsg(msgId) {
        const msgs = toy.msgs.filter(msg => msg.id !== msgId)
        const updatedToy = { ...toy, msgs }
        setToy(updatedToy)
        await saveToy(toy)
    }

    return <section className="msgs">
        <h3>Messages:</h3>
        {toy.msgs.length === 0 && <p>No messages... Add one!</p>}
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
}