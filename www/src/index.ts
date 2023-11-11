/* eslint-disable @typescript-eslint/no-non-null-assertion */

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'
const url = isProd
  ? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`
  : 'ws://localhost:8000/ws'

const formElement = document.getElementById('form')! as HTMLFormElement
const messagesElement = document.getElementById('messages')! as HTMLUListElement
const inputElement = document.getElementById('messageText')! as HTMLInputElement
const wsIdElement = document.getElementById('ws-id')! as HTMLSpanElement

const clientId = Date.now()
wsIdElement.textContent = clientId.toString()

const ws = new WebSocket(`${url}/${clientId}`)
ws.onmessage = function (event) {
  const { data } = event
  const message = document.createElement('li')
  const content = document.createTextNode(data)
  message.appendChild(content)
  messagesElement.appendChild(message)
}
function sendMessage (event: Event): void {
  event.preventDefault()
  const { value } = inputElement
  ws.send(value)
  inputElement.value = ''
}
formElement.addEventListener('submit', sendMessage)

/* eslint-enable @typescript-eslint/no-non-null-assertion */
