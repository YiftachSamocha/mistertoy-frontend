import { useEffect } from "react";
import { loadUsers, removeUser } from "../store/actions/user.actions.js";
import { useSelector } from "react-redux";
import { SOCKET_EVENT_ADMIN_MSGS, socketService } from "../services/socket.service.js";
import { showSuccessMsg } from "../services/event-bus.service.js";

export function AdminDetails() {
    const users = useSelector(state => state.userModule.users)
    const currUser = useSelector(state => state.authModule.loggedInUser)

    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADMIN_MSGS, msg => {
            showSuccessMsg(msg)
        })
    }, [])

    function formatDate(date) {
        const dateObj = new Date(date)
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return dateObj.toLocaleString('en-US', options)
    }

    function onRemoveUser(userId) {
        socketService.emit(SOCKET_EVENT_ADMIN_MSGS, { msg: 'Admin removed user', admin: currUser })
        removeUser(userId)
        showSuccessMsg('User removed successfully')
    }
    if (!currUser || !currUser.isAdmin) return <div>Only admin can watch users!</div>
    return <section className="admin-details">
        <h1>Users:</h1>
        <div className="user-preview">
            {users.map(user => {
                return <div key={user._id}>
                    <h2>{user.fullname}</h2>
                    <h3>{user.username}</h3>
                    <p>Created in {formatDate(user.createdAt)}</p>
                    {!user.isAdmin && <button onClick={() => onRemoveUser(user._id)}><i className="fa-solid fa-trash"></i></button>}
                </div>
            })}
        </div>
    </section>

}