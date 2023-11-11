const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'
const url = isProd
  ? `ws://${window.location.host}/ws`
  : 'ws://localhost:8000/ws'

const formElement = document.getElementById('form')! as HTMLFormElement
const messagesElement = document.getElementById('messages')! as HTMLUListElement
const inputElement = document.getElementById("messageText")! as HTMLInputElement

const ws = new WebSocket(url)
ws.onmessage = function (event) {
  const message = document.createElement('li')
  const content = document.createTextNode(event.data)
  message.appendChild(content)
  messagesElement.appendChild(message)
}
function sendMessage(event: Event) {
  event.preventDefault()
  const { value } = inputElement
  ws.send(value)
  inputElement.value = ''
}
formElement.addEventListener('submit', sendMessage)
