const filterObj = {
  _filter1: undefined,
  _filter2: undefined,
  _filter3: undefined,
  _filterCount: 0
}

Object.defineProperty(filterObj, 'filter1', {
  enumerable: true,
  get () {
    return this._filter1
  },
  set (newVal) {
    if (newVal === '' || newVal == null) {
      this._filter1 = undefined
      this._filterCount--
    } else {
      if (this._filter1 === undefined) {
        this._filterCount++
      }
      this._filter1 = newVal
    }
  }
})
Object.defineProperty(filterObj, 'filter2', {
  enumerable: true,
  get () {
    return this._filter2
  },
  set (newVal) {
    if (newVal === '' || newVal == null) {
      this._filter2 = undefined
      this._filterCount--
    } else {
      if (this._filter2 === undefined) {
        this._filterCount++
      }
      this._filter2 = newVal
    }
  }
})
Object.defineProperty(filterObj, 'filter3', {
  enumerable: true,
  get () {
    return this._filter3
  },
  set (newVal) {
    if (newVal === '' || newVal == null) {
      this._filter3 = undefined
      this._filterCount--
    } else {
      if (this._filter3 === undefined) {
        this._filterCount++
      }
      this._filter3 = newVal
    }
  }
})

Object.defineProperty(filterObj, 'filterCount', {
  enumerable: true,
  get () {
    return this._filterCount
  },
  set (newVal) {
    this._filterCount = newVal
  }
})

export default filterObj
