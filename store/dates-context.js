import React, { createContext, useReducer } from 'react'

const DATA = []

export const DatesContext = createContext({
  dates: [],
  changeDates: data => {},
})

function datesReducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return action.payload
    default:
      return state
  }
}

export default function DatesContextProvider({ children }) {
  const [datesState, dispatch] = useReducer(datesReducer, DATA)

  function changeDates(data) {
    dispatch({ type: 'CHANGE', payload: data })
  }

  const value = {
    dates: datesState,
    changeDates,
  }

  return <DatesContext.Provider value={value}>{children}</DatesContext.Provider>
}
