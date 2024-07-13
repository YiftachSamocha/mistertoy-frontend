const initialState = {
    toys: [],
    filterBy: { name: '', inStock: 'all', labels: [], sort: 'name' }
}

export const SET_TOYS = 'LOAD_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const EDIT_TOY = 'EDIT_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'


export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            const filteredToys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys: filteredToys }

        case ADD_TOY:
            const newToys = [...state.toys]
            newToys.push(action.toy)
            return { ...state, toys: newToys }

        case EDIT_TOY:
            const editedToys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys: editedToys }


        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }


        default:
            return state
    }
}