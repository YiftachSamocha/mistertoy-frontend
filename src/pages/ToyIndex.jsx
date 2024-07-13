import { Link } from "react-router-dom";
import { ToyList } from "../cmps/ToyList.jsx";
import { ToyFilter } from "../cmps/ToyFilter.jsx";

export function ToyIndex() {
    return <section className="toy-index">
        <ToyFilter />
        <Link to="/toy/edit"><button className="add-button">Add Toy!</button></Link>
        <ToyList />
    </section>
}