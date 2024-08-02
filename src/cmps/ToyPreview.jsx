import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {
    const isAdminLogged = useSelector(state => state.userModule.isAdminLogged)

    return <div className="toy" style={{ backgroundColor: toy.color }}>
        <h3 className={toy.inStock ? 'in-stock' : ''}>{toy.name}</h3>
        <h4>{toy.price}₪</h4>
        {isAdminLogged ? <div>
            <Link to={'/toy/' + toy._id}><button><i className="fa-solid fa-info"></i></button></Link>
            <Link to={'/toy/edit/' + toy._id}><button><i className="fa-solid fa-pen-to-square"></i></button></Link>
            <button onClick={() => onRemoveToy(toy._id)}><i className="fa-solid fa-trash"></i></button>
        </div> : <Link to={'/toy/' + toy._id}><button><i className="fa-solid fa-info"></i></button></Link>}
    </div>

}