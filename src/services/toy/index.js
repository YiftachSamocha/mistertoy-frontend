const { VITE_LOCAL } = import.meta.env
import { toyService as remote } from "./toy.service.remote.js"
import { toyService as local } from "./toy.service.local.js"

function getDefaultFilter() {
    return { name: '', inStock: 'all', labels: [], sort: 'name' }
}

function getEmptyToy() {
    return {
        name: '',
        price: 50,
        labels: [],
        createdAt: new Date(),
        inStock: false,
        color: '#ffffff',
        msgs: [],

    }
}



function getLabels() {
    return [
        "Doll", "Battery Powered", "Baby", "Educational", "Outdoor",
        "Collectible", "Soft", "Interactive", "Puzzle", "Remote Controlled",
        "Wooden", "Plastic", "Electronic", "Handcrafted", "Light-Up",
        "Musical", "Stuffed", "Ride-On", "Sports", "Creative"
    ]
}
const service = VITE_LOCAL === 'true' ? local : remote
export const toyService = { getDefaultFilter, getLabels, getEmptyToy, ...service }