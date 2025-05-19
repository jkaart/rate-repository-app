export const countWithSuffix = (value) => {
  if (!isNaN(value) && value >= 1000) {
    const count = value / 1000
    return `${count.toFixed(1)} k`
  }
  return value
}
