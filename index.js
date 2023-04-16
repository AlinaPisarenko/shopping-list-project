import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js'


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
    let itemsArray = []
    if (snapshot.exists()) {
        itemsArray = Object.entries(snapshot.val())
        itemsArray.forEach(item => {
            appendItemToList(item)
        })
    } else {
        list.textContent = "No items here... yet"
    }
    
})

const appendItemToList = (item) => {
    let id = item[0]
    let value = item[1]
    const li = document.createElement('li')
    li.textContent = value
    list.append(li)

    li.addEventListener('click', () => removeItem(id))
}

const removeItem = (id) => {
    const itemLocation = ref(database, `items/${id}`)
    remove(itemLocation)
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