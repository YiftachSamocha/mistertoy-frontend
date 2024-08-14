import { useEffect, useState } from "react"
import { SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG, socketService } from "../services/socket.service"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service.js"

export function ChatRoom({ toy }) {
    const [currTxt, setCurrTxt] = useState('')
    const currUser = useSelector(state => state.authModule.loggedInUser)
    const [msgs, setMsgs] = useState([])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])
    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toy._id)
    }, [toy])

    function addMsg(msg) {
        setMsgs(lastMsgs => [...lastMsgs, msg]) 
    }
    function handleChange({ target }) {
        const { value } = target
        setCurrTxt(value)
    }
    function sendMsg() {
        socketService.emit(SOCKET_EMIT_SEND_MSG, createMsg())
        setCurrTxt('')
    }

    function createMsg() {
        return {
            txt: currTxt,
            by: currUser,
            toyId: toy._id
        }
    }

    function filterMsgs(){
        return msgs.filter(msg => msg.toyId === toy._id)
    }

    if (!currUser) return <div>Log in to enter the chat!</div>
    return <section>
        <div>
            {filterMsgs().map(msg => {
                return <div key={utilService.makeId()}><b>{msg.by.fullname}</b>{msg.txt}</div>
            })}
        </div>

        <div>
            <input type="text" placeholder="Type here..." value={currTxt} onChange={handleChange} />
            <button onClick={sendMsg}>Send</button>
        </div>
    </section>
}