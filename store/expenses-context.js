import React, { createContext, useReducer } from 'react'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    descr: 'A pair of shoes',
    amount: 59,
    date: new Date('2023-11-01'),
  },
  {
    id: 'e2',
    descr: 'A pair of trousers',
    amount: 43.71,
    date: new Date('2023-11-02'),
  },
  {
    id: 'e3',
    descr: 'Some bananas',
    amount: 43.56,
    date: new Date('2022-05-26'),
  },
  {
    id: 'e4',
    descr: 'Book',
    amount: 64.1,
    date: new Date('2023-05-02'),
  },
  {
    id: 'e5',
    descr: 'Another Book',
    amount: 87.53,
    date: new Date('2023-11-12'),
  },
  {
    id: 'e6',
    descr: 'Apples',
    amount: 6.32,
    date: new Date('2023-11-10'),
  },
  {
    id: 'e7',
    descr: 'Pinapples',
    amount: 4.2,
    date: new Date('2023-7-10'),
  },
  {
    id: 'e8',
    descr: 'Book',
    amount: 145.22,
    date: new Date('2023-11-4'),
  },
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ descr, amount, date, newItem }) => {},
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
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
    deleteExpense,
    updateExpense,
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}
