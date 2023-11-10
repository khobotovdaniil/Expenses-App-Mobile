import React from 'react'
import { StyleSheet, FlatList } from 'react-native'

import ExpenseItem from './ExpenseItem'

const renderExpenseItem = itemData => {
  return <ExpenseItem {...itemData.item} />
}

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      style={styles.list}
      data={expenses}
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
