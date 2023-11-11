const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'
const url = isProd
  ? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws}`
  : 'ws://localhost:8000/ws'

const formElement = document.getElementById('form')! as HTMLFormElement
const messagesElement = document.getElementById('messages')! as HTMLUListElement
const inputElement = document.getElementById("messageText")! as HTMLInputElement
const wsIdElement = document.getElementById("ws-id")! as HTMLSpanElement

const client_id = Date.now()
wsIdElement.textContent = client_id.toString()

const ws = new WebSocket(`${url}/${client_id}`)
ws.onmessage = function (event) {
  const { data } = event
  const message = document.createElement('li')
  const content = document.createTextNode(data)
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
