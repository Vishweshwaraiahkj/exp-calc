const hideBodyOverlay = (event, itemsClass) => {
  event.preventDefault()
  const items = document.getElementsByClassName(itemsClass)
  for (let i = 0; i < items.length; i++) {
    items[i].classList.add('d-none')
  }
  document.getElementById('bodyOverlay').remove()
}

const addBodyOverlay = (event, itemsClass, backdropColor) => {
  event.preventDefault()
  document.getElementById('bodyOverlay')?.remove()
  const elem = document.createElement('div')
  elem.setAttribute('id', 'bodyOverlay')
  elem.setAttribute('class', backdropColor)
  elem.onclick = () => hideBodyOverlay(event, itemsClass)
  document.body.appendChild(elem)
}

export { addBodyOverlay, hideBodyOverlay }
