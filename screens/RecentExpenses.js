import React, { useContext } from 'react'
import { View, Text } from 'react-native'

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import DatesRangeInfoText from '../components/ExpensesOutput/DatesRangeInfoText'
import { ExpensesContext } from '../store/expenses-context'
import { DatesContext } from '../store/dates-context'
import { getFormattedDate, getNumberOfDays } from '../util/date'

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext)
  const datesCtx = useContext(DatesContext)

  const from = new Date(datesCtx.dates.from)
  const until = new Date(datesCtx.dates.until)

  const days = getNumberOfDays(from, until)

  const filteredExpenses = expensesCtx.expenses.filter(expense => {
    return expense.date >= from && expense.date <= until
  })

  const datesText =
    filteredExpenses.length > 0 ? (
      <DatesRangeInfoText
        from={getFormattedDate(from)}
        to={getFormattedDate(until)}
      />
    ) : null

  return (
    <>
      {datesText}
      <ExpensesOutput
        expenses={filteredExpenses}
        fallbackText="There have been no expenses"
        expensesPeriod={`Period of ${days} days`}
        from={getFormattedDate(from)}
        to={getFormattedDate(until)}
      />
    </>
  )
}
