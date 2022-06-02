export function filterProducts (filter, products) {
  let filteredList = [...products]

  if (filter.status !== 'all') {
    if (filter.status === 'color') {
      // we probably aren't including the correct way to find a specific color
      const filtered = filteredList.filter(product => product.color === filter.value)
      filteredList = filtered
    } else if (filter.status === 'gender') {
      const filtered = filteredList.filter(product => product.gender === filter.value)
      filteredList = filtered
    } else if (filter.status === 'size') {
      const filtered = filteredList.filter(product => product.size === filter.value)
      filteredList = filtered
    }
  }
  return filteredList
}

export function priceRange (priceLow, priceHigh, products) {
  const orderedList = [...products]

  orderedList.filter(function (x) {
    return x.price >= priceLow && x.price <= priceHigh
  })
  return orderedList
}

export function getLowHigh (products) {
  const productFilter = [...products]
  productFilter.sort(function (a, b) {
    return a - b
  })
  const lowestValue = productFilter[0].price
  const highestValue = productFilter[productFilter.length - 1].price
  return [lowestValue, highestValue]
}
