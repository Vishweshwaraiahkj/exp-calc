import ErrorMessages from '@/constants/Errors'

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
    const checkKey = Object.hasOwnProperty.call(yObject, key)
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
    alert(ErrorMessages.VALID_OBJECT)
    return false
  }

  if (!dataArray?.length) {
    alert(ErrorMessages.VALID_ARRAY)
    return false
  }

  const res = dataArray.map((item) => {
    return isSimilarObject(item, newObj)
  })
  const checkIt = res.some((i) => i === true)
  if (dataArray.length && checkIt) {
    alert(ErrorMessages.NO_DUPLICATES)
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
  return (
    typeof obj === 'object' &&
    Object.keys(obj).length !== 0 &&
    !Array.isArray(obj) &&
    obj !== null
  )
}

export const customSort = (objectsArray, key, type) => {
  if (!objectsArray) return false
  if (!key) key = 'sortKey'
  if (!type) type = 'asc'
  return objectsArray?.sort((a, b) => {
    const keyExists = Object.hasOwnProperty.call(a, key)
    if (!keyExists) return false
    let itemA = a[key]
    const itemB = b[key]

    if (!isNaN(itemA)) itemA = Number(itemA)
    if (!isNaN(itemA)) itemA = Number(itemA)

    if (itemA.constructor.name === 'Array') {
      return sortArrayObjects(itemA, itemB, type)
    }
    return sortPrimitives(itemA, itemB, type)
  })
}

const sortArrayObjects = (a, b, type) => {
  if (a.constructor.name !== 'Array' || b.constructor.name !== 'Array') {
    return false
  }
  let modifier = 1
  if (type === 'desc') {
    modifier = -1
  }
  if (a[0].sortKey < b[0].sortKey) {
    return -1 * modifier
  }
  if (a[0].sortKey > b[0].sortKey) {
    return 1 * modifier
  }
  return 0
}

const sortPrimitives = (a, b, type) => {
  let modifier = 1
  if (type === 'desc') {
    modifier = -1
  }
  if (a < b) {
    return -1 * modifier
  }
  if (a > b) {
    return 1 * modifier
  }
  return 0
}
