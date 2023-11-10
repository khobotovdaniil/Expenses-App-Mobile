import React, { useLayoutEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  return (
    <View>
      <Text>Manage</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
