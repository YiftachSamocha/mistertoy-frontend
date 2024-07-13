import { useState } from "react"
import { toyService } from "../services/toy.service.js"
import { useSelector } from "react-redux"
import { store } from "../store/store.js"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"

export function ToyFilter() {
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const [isLabelsOpened, setIsLabelsOpened] = useState(false)
    const labels = toyService.getLabels()

    function handleChange({ target }) {
        let { name, value, selected, type, checked } = target
        if (name === 'inStock' || name === 'sort') value === selected
        if (type === 'checkbox') {
            if (checked) store.dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, labels: [...filterBy.labels, name] } })
            else {
                const updatedLabels = filterBy.labels.filter(label => label !== name)
                store.dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, labels: updatedLabels } })
            }
            return
        }
        store.dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, [name]: value } })
    }
    return <section className="filterBy">
        <div>
            <label htmlFor="name" >Name:</label>
            <input type="text" id="name" name="name"
                value={filterBy.name} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="inStock">Stock</label>
            <select name="inStock" id="inStock"
                value={filterBy.inStock} onChange={handleChange} >
                <option value="all">All</option>
                <option value="in">In Stock</option>
                <option value="out">Out of Stock</option>
            </select>
        </div>
        <div>
            <label htmlFor="sort">Sort by:</label>
            <select name="sort" id="sort"
                value={filterBy.sort} onChange={handleChange}>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="date">Creation Time</option>
            </select>
        </div>
        <div className="label-container">
            <label htmlFor="lables">Labels:</label>
            <button type="button" onClick={() => setIsLabelsOpened(!isLabelsOpened)}>
                {isLabelsOpened ? 'Hide Labels' : 'Show Labels'}
            </button>
        </div>
        {isLabelsOpened && <div id="labels"  >
            {labels.map(label => {
                return <div key={label}>
                    <label htmlFor={label}>{label}</label>
                    <input type="checkbox" name={label} onChange={handleChange}
                        checked={filterBy.labels.includes(label)}></input>
                </div>
            })}
        </div>}

    </section>
}
