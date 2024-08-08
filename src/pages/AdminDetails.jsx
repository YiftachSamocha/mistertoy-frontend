import { useEffect, useState } from "react";
import { userService } from "../services/user";

export function AdminDetails() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.query()
            .then(foundUsers => setUsers(foundUsers))
    }, [])

    function onRemoveUser(){

    }

    return <section className="admin-details">
        <h1>Users:</h1>
        <div className="user-preview">
            {users.map(user=>{
                return <div>
                    <h2>{user.fullname}</h2>
                    <h3>{user.username}</h3>
                    <p>Created in {user.createdAt}</p>
                    <button onClick={onRemoveUser}><i className="fa-solid fa-trash"></i></button>
                </div>
            })}
        </div>
    </section>

}