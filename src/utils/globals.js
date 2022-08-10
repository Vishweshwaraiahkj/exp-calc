export const hideBodyOverlay = (event, itemsClass) => {
  event?.preventDefault()
  if (itemsClass) {
    const items = document.getElementsByClassName(itemsClass)
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add('d-none')
    }
  }
  document.getElementById('bodyOverlay').remove()
}

export const addBodyOverlay = (event, itemsClass, backdropColor) => {
  event?.preventDefault()
  document.getElementById('bodyOverlay')?.remove()
  const elem = document.createElement('div')
  elem.setAttribute('id', 'bodyOverlay')
  elem.setAttribute('class', backdropColor || 'dark')
  elem.onclick = () => hideBodyOverlay(event, itemsClass)
  document.body.appendChild(elem)
}

export const isSimilarObject = (oldObject, newObject) => {
  const xObject = ParseObject(oldObject)
  const yObject = ParseObject(newObject)
  const ObjOld = xObject?.constructor?.name
  const ObjNew = yObject?.constructor?.name
  if (ObjOld !== 'Object' || ObjNew !== 'Object') {
    return false
  }
  let count = 0
  Object.keys(xObject).forEach((key) => {
    const checkKey = Object.prototype.hasOwnProperty.call(yObject, key)
    const noSameKey = yObject[key] !== xObject[key]
    if ((!checkKey || noSameKey) && key !== 'id') {
      count++
    }
  })

  if (count > 0) {
    return false
  }
  return true
}

export const pushUniqueObjects = (dataArray, newObj) => {
  if (newObj?.constructor.name !== 'Object') {
    alert('Please provide valid object!')
    return false
  }

  if (!dataArray?.length) {
    alert('Please provide valid data array!')
    return false
  }

  const res = dataArray.map((item) => {
    return isSimilarObject(item, newObj)
  })
  const checkIt = res.some(i => i === true)
  if (dataArray.length && checkIt) {
    alert('Please don\'t duplicate')
  } else {
    dataArray.push(newObj)
  }
  return dataArray
}

export const ParseObject = (objectData) => {
  return JSON.parse(JSON.stringify(objectData))
}

export const StringifyObject = (objectData) => {
  return JSON.stringify(objectData)
}

export const isValidObject = (obj) => {
  return typeof obj === 'object' &&
    Object.keys(obj).length !== 0 &&
    !Array.isArray(obj) &&
    obj !== null
}
