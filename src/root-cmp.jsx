import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import { About } from "./pages/About.jsx";
import { ToyIndex } from "./pages/ToyIndex.jsx";
import { AppHeader } from "./cmps/AppHeader.jsx"
import { store } from "./store/store.js";
import { ToyDetails } from "./pages/ToyDetails.jsx";
import { ToyEdit } from "./pages/ToyEdit.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx";
import { DashBoard } from './pages/DashBoard.jsx';
import { UserDetails } from "./pages/UserDetails.jsx";
import { AdminDetails } from "./pages/AdminDetails.jsx";
import { ReviewExplore } from "./pages/ReviewExplore.jsx";


export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className="main-layout">
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<About />} path="/about" />
                            <Route element={<DashBoard />} path='/dashboard' />
                            <Route element={<ReviewExplore/>} path="/review" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:id" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:id" />
                            <Route element={<AdminDetails/>} path="/user/admin" />
                            <Route element={<UserDetails/>} path="/user/:id"/>
                        </Routes>
                    </main>
                </section>
                <UserMsg />
            </Router>
        </Provider>
    )

}