import { Link } from "react-router-dom";
import { ToyList } from "../cmps/ToyList.jsx";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { useSelector } from "react-redux";

export function ToyIndex() {
    const isAdminLogged = useSelector(state => state.userModule.isAdminLogged)
    return <section className="toy-index">
        <ToyFilter />
        {isAdminLogged && <div className="add-button"> <Link to="/toy/edit"><button>Add Toy!</button></Link></div>}
        <ToyList />
    </section>
}