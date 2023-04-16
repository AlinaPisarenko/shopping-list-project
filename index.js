import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js'


const appSettings = {
    databaseURL: "https://playground-8b971-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, 'items')

console.log()

const input = document.getElementById('input-field')
const addButton = document.getElementById('add-button')
const list = document.getElementById('shopping-list')

onValue(itemsInDB, (snapshot) => {
    clearList()
    let itemsArray = Object.values(snapshot.val())
    itemsArray.forEach(item => appendItemToList(item))
})

const appendItemToList = (item) => {
    list.innerHTML += `<li>${item}</li>`
}

const clearList = () => {
    list.innerHTML = ''
}

const resetInput = () => {
    input.value = ''
}

// EVENT LISTENERS

addButton.addEventListener('click', () => {
    const inputValue = input.value
    push(itemsInDB, inputValue)
    resetInput()
})