import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js'


const appSettings = {
    databaseURL: "https://playground-8b971-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, 'items')

console.log()

const input = document.getElementById('input-field')
const addButton = document.getElementById('add-button')

addButton.addEventListener('click', () => {
    const inputValue = input.value
    push(itemsInDB, inputValue)
})