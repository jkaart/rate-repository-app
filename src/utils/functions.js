export const countWithSuffix = (value) => {
  if (!isNaN(value) && value >= 1000) {
    const count = value / 1000
    return `${count.toFixed(1)} k`
  }
  return value
}

export const formatDate = (value) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }
  const date = new Date(value)
  return date.toLocaleDateString('fi-FI', options)
}
