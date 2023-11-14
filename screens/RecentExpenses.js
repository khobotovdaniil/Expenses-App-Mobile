import React, { useContext } from 'react'

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { DatesContext } from '../store/dates-context'
import {
  getDateMinusDays,
  getFormattedDate,
  getNumberOfDays,
} from '../util/date'

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext)
  const datesCtx = useContext(DatesContext)

  const from = new Date(datesCtx.dates.from)
  const until = new Date(datesCtx.dates.until)

  const days = getNumberOfDays(from, until)

  const filteredExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)

    return expense.date > date7DaysAgo && expense.date <= today
  })

  return (
    <ExpensesOutput
      expenses={filteredExpenses}
      fallbackText="There have been no expenses"
      expensesPeriod={`Period of ${days} days`}
      from={getFormattedDate(from)}
      to={getFormattedDate(until)}
    />
  )
}
