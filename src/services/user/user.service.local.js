import { storageService } from "../async-storage.service.js"
import { utilService } from "../util.service.js"

export const userService = { query, getById, reomve, save }
const DB_USERS = 'DB_USERS'
_createData()


async function query(filterBy = {}) {
    let users = await storageService.query(DB_USERS)
    return users
}

function save(userToSave) {
    if (userToSave._id) {
        return storageService.put(DB_USERS, userToSave)
    }
    else {
        return storageService.post(DB_USERS, userToSave)
    }
}

async function getById(userId) {
    return await storageService.get(DB_USERS, userId)
}

function reomve(userId) {
    return storageService.remove(DB_USERS, userId)
}


function _createData(length = 24) {
    if (!localStorage.getItem(DB_USERS) || localStorage.getItem(DB_USERS).length === 0) {
        let newUsers = []
        for (var i = 0; i < length; i++) {
            const user = {
                _id: utilService.makeId(),
                fullname: _getRandomAnimal(),
                password: _getRandomAnimal(),
                username: _getRandomAnimal(),
                reviews: [],
            }
            newUsers.push(user)
        }
        localStorage.setItem(DB_USERS, JSON.stringify(newUsers))
    }
}

function _getRandomAnimal() {
    const animalNames = ["Lion", "Tiger", "Elephant", "Giraffe", "Zebra", "Kangaroo", "Panda", "Koala", "Penguin", "Dolphin", "Shark", "Eagle", "Wolf", "Bear"];
    const randomIndex = Math.floor(Math.random() * animalNames.length)
    return animalNames[randomIndex]
}