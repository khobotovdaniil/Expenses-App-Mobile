export function getFormattedDate(date) {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1

  return `${day}-${month}-${date.getFullYear()}`
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}
