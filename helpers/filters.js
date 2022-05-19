export function filterProducts (filter, products) {
  let filteredList = [...products]
  let filtersList = [...filter]

  if (filter.status !== 'all') {
    if(filter.status === 'color') {
      //we probably aren't including the correct way to find a specific color
      const filtered = filteredList.filter(product => product.color === filter.value)
      filteredList = filtered
    }
    else if(filter.status === 'gender') {
      const filtered = filteredList.filter(product => product.gender === filter.value)
      filteredList = filtered
    }
    else if(filter.status === 'size') {
      const filtered = filteredList.filter(product => product.size === filter.value)
      filteredList = filtered
    }
  }
  return filteredList
}
