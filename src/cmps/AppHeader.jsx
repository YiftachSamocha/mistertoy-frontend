import { NavLink } from "react-router-dom";
import { LoginSignup } from "./LoginSignup.jsx";
import { useSelector } from "react-redux";
import { logout } from "../store/actions/user.actions.js";


export function AppHeader() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    return <section className="app-header">
        <header>
            <h1>Toys!</h1>
            {loggedInUser ? <section className="user-info">
                <div>Hello {loggedInUser.fullname}</div>
                <button onClick={() => logout()}>Log out</button>
            </section> : <LoginSignup />}
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toys</NavLink>
            </nav>
        </header>
    </section>
}