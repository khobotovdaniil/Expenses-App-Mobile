import React from 'react'
import { StyleSheet, FlatList } from 'react-native'

import ExpenseItem from './ExpenseItem'

const renderExpenseItem = itemData => {
  return <ExpenseItem {...itemData.item} />
}

export default function ExpensesList({ expenses }) {
  const expensesSorted = expenses.sort((a, b) => {
    let DateA = new Date(a.date)
    let DateB = new Date(b.date)
    return DateB - DateA
  })

  return (
    <FlatList
      style={styles.list}
      data={expensesSorted}
      keyExtractor={item => item.id}
      renderItem={renderExpenseItem}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    paddingRight: 5,
  },
})
