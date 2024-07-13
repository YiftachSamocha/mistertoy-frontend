import { Link } from "react-router-dom";
import { ToyList } from "../cmps/ToyList.jsx";

export function ToyIndex() {
    return <section className="toy-index">
        <Link to="/toy/edit"><button className="add-button">Add Toy!</button></Link>
        <ToyList />
    </section>
}