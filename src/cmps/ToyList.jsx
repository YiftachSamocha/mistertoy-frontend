import { useSelector } from "react-redux"
import { ToyPreview } from "./ToyPreview.jsx"
import { loadToys, removeToy } from "../store/actions/toy.actions.js"
import { useEffect } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function ToyList() {
    const toys = useSelector(state => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])


    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed successfully')
        }
        catch { showErrorMsg('Cannot remove toy...') }

    }
    if (!toys || toys.length === 0) return <div className="no-toys">Loading...</div>
    return <section className="toy-list">
        {toys.map(toy => {
            return <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />
        })}

    </section>
}