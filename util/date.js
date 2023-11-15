export function getFormattedDate(date) {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1

  return `${day}-${month}-${date.getFullYear()}`
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

export function getNumberOfDays(start, end) {
  const date1 = new Date(start)
  const date2 = new Date(end)

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime()

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay)

  return diffInDays
}

export function createDateFromString(item) {
  let [day, month, year] = item.value.split(/[-,.,/,\, ]/)

  const fullYear = year => {
    return year && year.length < 3 ? +`20${year}` : +year
  }

  return new Date(fullYear(year), +month - 1, +day)
}

export function dateIsValid(item) {
  return item.toString() !== 'Invalid Date'
}
