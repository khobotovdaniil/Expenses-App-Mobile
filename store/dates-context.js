import React, { createContext, useReducer } from 'react'
import { getDateMinusDays } from '../util/date'

const today = new Date()
const date7DaysAgo = getDateMinusDays(today, 6)

const DATA = {
  from: date7DaysAgo,
  until: today,
}

export const DatesContext = createContext({
  dates: [],
  changeDates: () => {},
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
