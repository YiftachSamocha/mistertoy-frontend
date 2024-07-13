import { NavLink } from "react-router-dom";

export function AppHeader() {
    return <section>
        <header>
            <h1>Toys!</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toys</NavLink>
            </nav>
        </header>
    </section>
}