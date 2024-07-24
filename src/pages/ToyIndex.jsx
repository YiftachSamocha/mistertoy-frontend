import { Link } from "react-router-dom";
import { ToyList } from "../cmps/ToyList.jsx";
import { ToyFilter } from "../cmps/ToyFilter.jsx";

export function ToyIndex() {
    return <section className="toy-index">
        <ToyFilter />
        <div className="add-button"> <Link to="/toy/edit"><button>Add Toy!</button></Link></div>
        <ToyList />
    </section>
}