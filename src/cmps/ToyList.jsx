import { useSelector } from "react-redux"
import { ToyPreview } from "./ToyPreview.jsx"
import { loadToys, removeToy } from "../store/actions/toy.actions.js"
import { useEffect } from "react"


export function ToyList() {
    const toys = useSelector(state => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])


    function onRemoveToy(toyId) {
        removeToy(toyId)
    }
    if (!toys || toys.length === 0) return <div className="no-toys">Loading...</div>
    return <section className="toy-list">
        {toys.map(toy => {
            return <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />
        })}

    </section>
}