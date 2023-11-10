import React from 'react'
import { StyleSheet, View } from 'react-native'

import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

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
    date: new Date('2023-11-09'),
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
    date: new Date('2023-11-10'),
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
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
})
