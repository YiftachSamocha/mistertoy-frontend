import { useEffect, useState } from "react"
import { saveToy } from "../store/actions/toy.actions.js"
import { toyService } from "../services/toy/index.js"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { FormControl, Input, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material"
import { uploadService } from "../services/upload.service.js"
import { SOCKET_EVENT_ADMIN_MSGS, socketService } from "../services/socket.service.js"
import { useSelector } from "react-redux"




export function ToyEdit() {
    const [toyToSave, setToyToSave] = useState(toyService.getEmptyToy())
    const { id } = useParams()
    const currUser = useSelector(state => state.authModule.loggedInUser)

    const navigate = useNavigate()

    const labels = toyService.getLabels()
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    useEffect(() => {
        if (id) {
            toyService.getById(id)
                .then(toy => setToyToSave(toy))
        }
    }, [id])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADMIN_MSGS, msg => {
            showSuccessMsg(msg)
        })
    }, [])

    async function handleChange(ev) {
        const { target } = ev
        let { name, value, checked, componentName } = target
        if (name === 'inStock') value = checked
        if (componentName) name = componentName
        if (name === 'img') {
            const toyImg = await uploadService.uploadImg(ev)
            value = toyImg.secure_url
        }
        setToyToSave({ ...toyToSave, [name]: value })
    }

    async function onSaveToy() {
        try {
            await saveToy(toyToSave)
            navigate('/toy')
            socketService.emit(SOCKET_EVENT_ADMIN_MSGS, { msg: `Admin ${id ? 'edited' : 'added'} toy`, admin: currUser })
            showSuccessMsg(`Toy ${id ? 'Edited' : 'Added'} successfully`)
        }
        catch { showErrorMsg(`Cannot ${id ? 'edit' : 'add'} toy...`) }
    }

    return <section className="save-toy">

        <h2>{id ? 'Edit' : 'Add'} Toy!</h2>
        <Input aria-label="Demo input" placeholder="Enter Toy Name..." name="name"
            value={toyToSave.name} onChange={handleChange} />
        {/* <NumberInputIntroduction value={toyToSave.price} handleChange={handleChange} /> */}
        <div className="short-inputs">
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
            <div className="instock">
                <label htmlFor="inStock">{toyToSave.inStock ? 'In Stock!' : 'Not in Stock'}</label>
                <input type="checkbox" name="inStock" id="inStock"
                    checked={toyToSave.inStock} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="img">
                    Image
                    <img src={toyToSave.img} alt="" />
                    <input type="file" accept="image/*" hidden name="img" id="img" onChange={handleChange} />
                </label>

            </div>
        </div>

        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Labels</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={toyToSave.labels}
                    onChange={handleChange}
                    input={<OutlinedInput label="Label" />}
                    MenuProps={MenuProps}
                    name="labels"
                >
                    {labels.map((label) => (
                        <MenuItem
                            key={label}
                            value={label}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>

        <button onClick={onSaveToy} className="submit-btn">{id ? 'Edit' : 'Add'}</button>

    </section>
}
