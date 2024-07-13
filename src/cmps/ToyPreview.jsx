import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {

    return <div className="toy" style={{ backgroundColor: toy.color }}>
        <h3 className={toy.isStock ? 'in-stock' : ''}>{toy.name}</h3>
        <h4>{toy.price}</h4>
        <div>
            <Link to={'/toy/' + toy._id}><button><i className="fa-solid fa-info"></i></button></Link>
            <button><i className="fa-solid fa-pen-to-square"></i></button>
            <button onClick={() => onRemoveToy(toy._id)}><i className="fa-solid fa-trash"></i></button>
        </div>
    </div>

}