import { NavLink } from "react-router-dom";
import { LoginSignup } from "./LoginSignup.jsx";
import { useSelector } from "react-redux";
import { logout } from "../store/actions/auth.actions.js";
import { useEffect, useState } from "react";
import { SideBar } from "./MaterialUi/SideBar.jsx";




export function AppHeader() {
    const nav = [{ txt: 'Home', url: '/' }, { txt: 'About', url: '/about' }, { txt: 'Toys', url: '/toy' }, { txt: 'Dahboard', url: '/dashboard' }]
    const breakpoint = 600
    const [isNarrow, setIsNarrow] = useState(window.innerWidth < breakpoint)
    const isAdminLogged = useSelector(state => state.userModule.isAdminLogged)

    useEffect(() => {
        const handleResize = () => {
            setIsNarrow(window.innerWidth < breakpoint)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    return <section className="app-header">
        <header>
            <h1>Toys!</h1>
            {loggedInUser ? <section className="user-info">
                <div>Hello {loggedInUser.fullname}</div>
                {isAdminLogged && <p>(Admin)</p>}
                <button onClick={() => logout()}>Log out</button>
            </section> : <LoginSignup />}
            {isNarrow ? <SideBar nav={nav} /> : <nav>
                {nav.map(link => {
                    return <NavLink to={link.url}>{link.txt}</NavLink>
                })}
            </nav>}

        </header>
    </section>
}