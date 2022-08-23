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

const trimString = (s) => {
  let l = 0
  let r = s.length - 1
  while (l < s.length && s[l] === ' ') l++
  while (r > l && s[r] === ' ') r -= 1
  return s.substring(l, r + 1)
}

const compareObjects = (o1, o2) => {
  let k = ''
  for (k in o1) {
    if (o1[k] !== o2[k]) return false
  }
  for (k in o2) {
    if (o1[k] !== o2[k]) return false
  }
  return true
}

const itemExists = (haystack, needle) => {
  for (let i = 0; i < haystack.length; i++) {
    if (compareObjects(haystack[i], needle)) return true
  }
  return false
}

export const searchData = (searchData, searchKey) => {
  if (!searchData.length || !searchKey) return false
  const results = []
  const toSearch = trimString(searchKey).toLowerCase() // trim it
  for (let i = 0; i < searchData.length; i++) {
    for (const key in searchData[i]) {
      let searchItem = searchData[i][key]
      if (typeof searchItem === 'string') {
        searchItem = searchItem.toLowerCase()
      } else {
        searchItem = searchItem[0]?.sortKey?.toLowerCase()
      }
      if (searchItem.indexOf(toSearch) !== -1) {
        if (!itemExists(results, searchData[i])) {
          results.push(searchData[i])
        }
      }
    }
  }
  return results
}
