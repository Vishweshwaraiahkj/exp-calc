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

const isObjectSimilar = (oldObject, newObject) => {
  const ObjOld = oldObject?.constructor?.name
  const ObjNew = newObject?.constructor?.name
  if (ObjOld !== 'Object' || ObjNew !== 'Object') {
    return false
  }
  let count = 0
  Object.keys(oldObject).forEach((key) => {
    const checkKey = Object.prototype.hasOwnProperty.call(newObject, key)
    const noSameKey = newObject[key] !== oldObject[key]
    if ((!checkKey || noSameKey) && key !== 'uid') {
      count++
    }
  })

  if (count > 0) {
    return false
  }
  return true
}

const pushUniqueObjects = (dataArray, newObj) => {
  if (newObj?.constructor.name !== 'Object') {
    alert('Please provide valid object!')
    return false
  }
  const res = dataArray.map((item) => {
    return isObjectSimilar(item, newObj)
  })
  const checkIt = res.some(i => i === true)
  if (dataArray.length && checkIt) {
    alert('Please don\'t duplicate')
  } else {
    dataArray.push(newObj)
  }
  return dataArray
}

export { addBodyOverlay, hideBodyOverlay, pushUniqueObjects }
