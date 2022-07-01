Array.prototype.remove = function (key, value) {
  const index = this.findIndex((obj) => obj[key] === value)
  return index >= 0
    ? [...this.slice(0, index), ...this.slice(index + 1)]
    : this
}

Array.prototype.pushunique = function (key, object) {
  const payload = JSON.parse(JSON.stringify(object))
  const fullArray = JSON.parse(JSON.stringify(this))
  const index = fullArray.findIndex((obj) => obj[key] === payload[key])
  if (index < 0 || fullArray.length === 0) {
    fullArray.push(payload)
  }
  return fullArray
}
