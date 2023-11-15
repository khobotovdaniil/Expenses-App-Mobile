import React, { createContext, useReducer } from 'react'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ descr, amount, date, newItem }) => {},
  setExpenses: expenses => {},
  deleteExpense: id => {},
  updateExpense: (id, { descr, amount, date }) => {},
})

function expensesReducer(state, action) {
  const newState = [...state]
  const newItem = true

  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()

      const prevNewExpenseIndex = state.findIndex(expense => expense.newItem)
      if (prevNewExpenseIndex >= 0) {
        newState[prevNewExpenseIndex].newItem =
          newState[prevNewExpenseIndex].newItem && false
      }

      return [{ ...action.payload, id, newItem }, ...newState]
    case 'SET':
      return action.payload
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload)
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      newState[updatableExpenseIndex] = updatedItem
      return newState
    default:
      return state
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}
