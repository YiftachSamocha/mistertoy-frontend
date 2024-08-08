import { Link, NavLink } from "react-router-dom";
import { LoginSignup } from "./LoginSignup.jsx";
import { useSelector } from "react-redux";
import { logout } from "../store/actions/auth.actions.js";
import { useEffect, useState } from "react";
import { SideBar } from "./MaterialUi/SideBar.jsx";
import { utilService } from "../services/util.service.js";

export function AppHeader() {
    const nav = [
        { txt: 'Home', url: '/' },
        { txt: 'About', url: '/about' },
        { txt: 'Toys', url: '/toy' },
        { txt: 'Dahboard', url: '/dashboard' },
        { txt: 'Reviews', url: '/review' }
    ]
    const breakpoint = 600
    const [isNarrow, setIsNarrow] = useState(window.innerWidth < breakpoint)
    const isAdminLogged = useSelector(state => state.authModule.isAdminLogged)

    useEffect(() => {
        const handleResize = () => {
            setIsNarrow(window.innerWidth < breakpoint)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    const loggedInUser = useSelector(state => state.authModule.loggedInUser)
    return <section className="app-header">
        <header>
            <h1>Toys!</h1>
            {loggedInUser ? <section className="user-info">
                <Link to={'/user/' + loggedInUser._id}>Hello {loggedInUser.fullname}</Link>
                {isAdminLogged && <p>(Admin)</p>}
                <button onClick={() => logout()}>Log out</button>
                {isAdminLogged && <Link to="/user/admin">Users</Link>}
            </section> : <LoginSignup />}
            {isNarrow ? <SideBar nav={nav} /> : <nav>
                {nav.map(link => {
                    return <NavLink to={link.url} key={utilService.makeId()}>{link.txt}</NavLink>
                })}
            </nav>}

        </header>
    </section>
}