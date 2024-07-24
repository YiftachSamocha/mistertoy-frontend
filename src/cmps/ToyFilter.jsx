import { toyService } from "../services/toy.service.js"
import { useSelector } from "react-redux"
import { store } from "../store/store.js"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Input, TextField } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



export function ToyFilter() {
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const labels = toyService.getLabels()

    function handleChange({ target }) {
        let { name, value } = target
        store.dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, [name]: value } })
    }
    return <section className="filterBy">
        <Input aria-label="Demo input" placeholder="Name" name="name"
            value={filterBy.name} onChange={handleChange} />

        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">In Stock</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterBy.inStock}
                    label="inStock"
                    onChange={handleChange}
                    name="inStock"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="in">In Stock</MenuItem>
                    <MenuItem value="out">Out of Stock</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterBy.sort}
                    label="Sort"
                    onChange={handleChange}
                    name="sort"
                >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="date">Creation time</MenuItem>
                </Select>
            </FormControl>
        </Box>

        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Labels</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={filterBy.labels}
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
    </section>
}
