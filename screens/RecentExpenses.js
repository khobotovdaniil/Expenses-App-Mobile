import React, { useContext, useEffect, useState } from 'react'

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import DatesRangeInfoText from '../components/ExpensesOutput/DatesRangeInfoText'
import { ExpensesContext } from '../store/expenses-context'
import { DatesContext } from '../store/dates-context'
import { getFormattedDate, getNumberOfDays } from '../util/date'
import { fetshExpenses } from '../util/http'
import LoadingOverlay from '../UI/LoadingOverlay'
import ErrorOverlay from '../UI/ErrorOverlay'

export default function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  const expensesCtx = useContext(ExpensesContext)
  const datesCtx = useContext(DatesContext)

  async function getExpenses() {
    setIsFetching(true)
    try {
      const expenses = await fetshExpenses()
      expensesCtx.setExpenses(expenses)
    } catch (error) {
      setError('Could not fetch expenses!')
    }
    setIsFetching(false)
  }

  useEffect(() => {
    getExpenses()
  }, [])

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

  const errorHandler = () => {
    setError(null)
  }

  const repeatHandler = () => {
    getExpenses()
  }

  if (error && !isFetching) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={errorHandler}
        onRepeat={repeatHandler}
      />
    )
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

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
