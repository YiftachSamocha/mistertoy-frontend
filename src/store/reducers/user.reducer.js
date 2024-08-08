const initialState = {
    users: [],
}

export const SET_USERS = 'LOAD_USERS'
export const REMOVE_USER = 'REMOVE_USER'
export const ADD_USER = 'ADD_USER'
export const EDIT_USER = 'EDIT_USER'

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_USERS:
            return { ...state, users: action.users }

        case REMOVE_USER:
            const filteredUsers = state.users.filter(user => user._id !== action.userId)
            return { ...state, users: filteredUsers }

        case ADD_USER:
            const newUsers = [...state.users]
            newUsers.push(action.user)
            return { ...state, users: newUsers }

        case EDIT_USER:
            const editedUsers = state.users.map(user => user._id === action.user._id ? action.user : user)
            return { ...state, users: editedUsers }

        default:
            return state
    }
}