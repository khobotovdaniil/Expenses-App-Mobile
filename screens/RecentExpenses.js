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

  const from = new Date(datesCtx.dates[0].from)
  const until = new Date(datesCtx.dates[0].until)

  const days = getNumberOfDays(from, until)

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)

    return expense.date > date7DaysAgo && expense.date <= today
  })

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      fallbackText="There have been no expenses"
      expensesPeriod={`Period of ${days} days`}
      from={getFormattedDate(from)}
      to={getFormattedDate(until)}
    />
  )
}
