import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"


export const toyService = { query, getById, reomve, save, getDefaultFilter, getEmptyToy, getLabels }
const DB_TOYS = 'DB_TOYS'
_createData()

function query(filterBy = {}) {
    return storageService.query(DB_TOYS)
}

function save(toyToSave) {
    if (toyToSave._id) {
        return storageService.put(DB_TOYS, toyToSave)
    }
    else {
        return storageService.post(DB_TOYS, toyToSave)
    }
}

function getById(toyId) {
    return storageService.get(DB_TOYS, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function reomve(toyId) {
    return storageService.remove(DB_TOYS, toyId)
}

function getDefaultFilter() {
    return { name: '', inStock: 'all', labels: [], sort: 'name' }
}

function getEmptyToy() {
    return {
        name: '',
        price: 50,
        labels: [],
        createdAt: new Date(),
        isStock: false,
        color: '#ffffff',

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

function _setNextPrevToyId(toy) {
    return storageService.query(DB_TOYS).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy._id
        toy.prevToyId = prevToy._id
        return toy
    })
}

function _createData(length = 24) {
    if (!localStorage.getItem(DB_TOYS) || localStorage.getItem(DB_TOYS).length === 0) {
        let toys = []
        for (var i = 0; i < length; i++) {
            const toy = {
                _id: utilService.makeId(),
                name: _getRandomItem('name'),
                price: _getRandomItem('price'),
                labels: _getRandomItem('labels'),
                createdAt: new Date(),
                inStock: _getRandomItem('isStock'),
                color: _getRandomItem('color'),
            }
            toys.push(toy)
        }
        localStorage.setItem(DB_TOYS, JSON.stringify(toys))
    }

}
function _getRandomItem(type) {
    const toyNames = [
        "Talking Doll", "Tall Cowboy", "Race Car", "Action Figure", "Stuffed Bear",
        "Remote Helicopter", "Building Blocks", "Puzzle Box", "Water Gun", "Robot",
        "Stuffed Rabbit", "Toy Train", "Toy Soldier", "Toy Drum", "Toy Piano",
        "Toy Boat", "Bouncing Ball", "Toy Dinosaur", "Toy Castle", "Toy Spaceship"
    ]

    const labels = [
        "Doll", "Battery Powered", "Baby", "Educational", "Outdoor",
        "Collectible", "Soft", "Interactive", "Puzzle", "Remote Controlled",
        "Wooden", "Plastic", "Electronic", "Handcrafted", "Light-Up",
        "Musical", "Stuffed", "Ride-On", "Sports", "Creative"
    ]

    const colors = [
        "#E6E6FA",
        "#FFDAB9",
        "#98FB98",
        "#87CEEB",
        "#FFB6C1",
        "#FFFFE0",
        "#77DD77",
        "#ADD8E6",
        "#FFD1DC",
        "#F8DE7E"
    ]

    switch (type) {
        case "name":
            return toyNames[Math.floor(Math.random() * toyNames.length)]

        case "price":
            return Math.floor(Math.random() * (200 - 50 + 1)) + 50

        case "labels":
            let result = []
            let tempArray = [...labels]
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * tempArray.length)
                result.push(tempArray.splice(randomIndex, 1)[0])
            }
            return result

        case "isStock":
            return Math.random() < 0.5

        case "color":
            return colors[Math.floor(Math.random() * colors.length)]

        default:
            return null
    }
}


