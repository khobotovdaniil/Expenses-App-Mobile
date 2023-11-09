import React from 'react'
import { StyleSheet, View } from 'react-native'

import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    descr: 'A pair of shoes',
    amount: 59.34,
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
    date: new Date('2022-05-05'),
  },
  {
    id: 'e4',
    descr: 'Book',
    amount: 64.16,
    date: new Date('2023-05-02'),
  },
  {
    id: 'e5',
    descr: 'Another Book',
    amount: 87.53,
    date: new Date('2023-11-09'),
  },
]

export default function ExpensesOutput({ expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={DUMMY_EXPENSES}
        periodName={expensesPeriod}
      />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
})
