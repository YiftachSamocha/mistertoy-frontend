import { useEffect } from "react";
import { loadUsers, removeUser } from "../store/actions/user.actions.js";
import { useSelector } from "react-redux";

export function AdminDetails() {
    const users = useSelector(store => store.userModule.users)

    useEffect(() => {
        loadUsers()
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

    return <section className="admin-details">
        <h1>Users:</h1>
        <div className="user-preview">
            {users.map(user => {
                return <div key={user._id}>
                    <h2>{user.fullname}</h2>
                    <h3>{user.username}</h3>
                    <p>Created in {formatDate(user.createdAt)}</p>
                    <button onClick={() => removeUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                </div>
            })}
        </div>
    </section>

}