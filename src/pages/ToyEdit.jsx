import { useEffect, useState } from "react"
import { saveToy } from "../store/actions/toy.actions.js"
import { toyService } from "../services/toy.service.js"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function ToyEdit() {
    const [toyToSave, setToyToSave] = useState(toyService.getEmptyToy())
    const [isLabelsOpened, setIsLabelsOpened] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const labels = toyService.getLabels()

    useEffect(() => {
        if (id) {
            toyService.getById(id)
                .then(toy => setToyToSave(toy))
        }
    }, [id])

    function handleChange({ target }) {
        let { name, type, value, checked } = target
        if (name === 'inStock') value = checked
        else if (type === 'checkbox') {
            if (checked) setToyToSave({ ...toyToSave, labels: [...toyToSave.labels, name] })
            else {
                const updatedLabels = toyToSave.labels.filter(label => label !== name)
                setToyToSave({ ...toyToSave, labels: updatedLabels })
            }
            return

        }
        setToyToSave({ ...toyToSave, [name]: value })
    }

    function onSaveToy() {
        saveToy(toyToSave)
            .then(() => {
                navigate('/toy')
                showSuccessMsg(`Toy ${id ? 'Edited' : 'Added'} successfully`)
            })
            .catch(() => showErrorMsg(`Cannot ${id ? 'edit' : 'add'} toy...`))

    }

    return <section className="save-toy">
        <h2>{id ? 'Edit' : 'Add'} Toy!</h2>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name"
                value={toyToSave.name} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="price">Price:</label>
            <input type="number" min="50" max="200" name="price" id="price"
                value={toyToSave.price} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="color">Color:</label>
            <input type="color" name="color" id="color"
                value={toyToSave.color} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="inStock">{toyToSave.inStock ? 'In Stock!' : 'Not in Stock'}</label>
            <input type="checkbox" name="inStock" id="inStock"
                checked={toyToSave.inStock} onChange={handleChange} />
        </div>
        <div className="label-container">
            <label htmlFor="lables">Labels:</label>
            <button type="button" onClick={() => setIsLabelsOpened(!isLabelsOpened)}>
                {isLabelsOpened ? 'Hide Labels' : 'Show Labels'}
            </button>
        </div>
        {isLabelsOpened && <div id="labels" onChange={handleChange} multiple size={labels.length} >
            {labels.map(label => {
                return <div key={label}>
                    <label htmlFor={label}>{label}</label>
                    <input type="checkbox" name={label} onChange={handleChange}
                        checked={toyToSave.labels.includes(label)}></input>
                </div>
            })}
        </div>}

        <button onClick={onSaveToy}>{id ? 'Edit' : 'Add'}</button>

    </section>
}
