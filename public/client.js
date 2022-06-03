const socket = io()

let namee;

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message--area')
let notificationArea = document.querySelector('.notification--area')




do{
    namee = prompt("Please enter your name: ")
}while(!namee)

textarea.addEventListener('keyup', (e) => {

    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }

})

function sendMessage(message) {
    let msg = {
        user: namee,
        message: message.trim()
    }

    // Append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    //send to server
    socket.emit('message', msg)
  
}

function appendMessage(msg, type){

    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)

}

// function showNotification(noti) {
//     notificationArea.innerHTML = noti
// }

// Receive Message
socket.on('message', (msg) => {
    appendMessage(msg, 'incomming')
    scrollToBottom()
})




function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


