import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import { About } from "./pages/About.jsx";
import { ToyIndex } from "./pages/ToyIndex.jsx";
import { AppHeader } from "./cmps/AppHeader.jsx"

import './assets/style/main.css'

export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route element={<HomePage />} path="/" />
                        <Route element={<About />} path="/about" />
                        <Route element={<ToyIndex />} path="/toy" />

                    </Routes>
                </main>
            </section>
        </Router>
    )

}