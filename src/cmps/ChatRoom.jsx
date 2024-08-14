import { useEffect, useState } from "react"
import { SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG, SOCKET_EVENT_USET_TYPING, socketService } from "../services/socket.service"
import { useSelector } from "react-redux"
import { addToyMsg } from "../store/actions/toy.actions.js"

export function ChatRoom({ toy }) {
    const [currTxt, setCurrTxt] = useState('')
    const currUser = useSelector(state => state.authModule.loggedInUser)
    const [msgs, setMsgs] = useState(toy.msgs)
    const [typingUsers, setTypingUsers] = useState([])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])
    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toy._id)
        setMsgs(toy.msgs)
    }, [toy])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_USET_TYPING, setTypingUser)

        return () => {
            socketService.off(SOCKET_EVENT_USET_TYPING, setTypingUser)
        }
    }, [])

    function addMsg(msg) {
        setMsgs(lastMsgs => [...lastMsgs, msg])
    }

    function setTypingUser(user) {
        if (user.stopped) {
            removeTypingUser(user)
            return
        }
        setTypingUsers(prev => {
            if (prev.some(u => u._id === user._id)) return prev
            return [...prev, user]
        })
    }
    function removeTypingUser(user) {
        setTypingUsers(prev => prev.filter(u => u._id !== user._id))
    }
    function handleChange({ target }) {
        const { value } = target
        setCurrTxt(value)
        socketService.emit(SOCKET_EVENT_USET_TYPING, currUser)

        clearTimeout(window.typingTimeout)

        window.typingTimeout = setTimeout(() => {
            removeTypingUser(currUser)
            socketService.emit(SOCKET_EVENT_USET_TYPING, { ...currUser, stopped: true })
        }, 2000)
    }
    function sendMsg(ev) {
        ev.preventDefault()
        const msgToSend = createMsg()
        addToyMsg(msgToSend)
        socketService.emit(SOCKET_EMIT_SEND_MSG, msgToSend)
        setCurrTxt('')
    }

    function createMsg() {
        return {
            txt: currTxt,
            by: currUser,
            toyId: toy._id
        }
    }

    function filterMsgs() {
        return msgs.filter(msg => msg.toyId === toy._id)
    }

    function renderTypers() {
        if (typingUsers.length === 0) return ''
        if (typingUsers.length === 1) return <div>{typingUsers[0].fullname + ' is typing...'}</div>
        return <div>{typingUsers.map(user => <span key={user._id}>{user.fullname}, </span>)} are typing...</div>
    }

    if (!currUser) return <div>Log in to enter the chat!</div>
    return <section className="chatroom">
        <div className="typing">
            {renderTypers()}
        </div>
        <div className="chat" >
            {filterMsgs().map(msg => {
                return <div className={`message ${msg.by.fullname === currUser.fullname ? 'me' : 'other'}`}>
                    <b>{msg.by.fullname === currUser.fullname ? 'Me' : msg.by.fullname}:</b>
                    <span>{msg.txt}</span>
                </div>

            })}
        </div>
        <form className="new-msg">
            <input type="text" placeholder="Type here..." value={currTxt} onChange={handleChange} />
            <button onClick={sendMsg}>Send</button>
        </form>
    </section>
}