import React, { useLayoutEffect, useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import IconButton from '../UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'
import { storeExpense, updateExpense, deleteExpense } from '../util/http'
import LoadingOverlay from '../UI/LoadingOverlay'
import ErrorOverlay from '../UI/ErrorOverlay'

export default function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState()
  const [data, setData] = useState(null)
  const [error, setError] = useState()

  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === editedExpenseId
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  async function deleteExpenseHandler() {
    setIsSubmitting(true)
    try {
      expensesCtx.deleteExpense(editedExpenseId)
      await deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError('Could not delete expense - please try again later!')
      setIsSubmitting(false)
    }
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({ ...expenseData, id })
      }
      navigation.goBack()
    } catch (error) {
      setError('Could not save data - please try again later!')
      setData(expenseData)
      setIsSubmitting(false)
    }
  }

  const errorHandler = () => {
    setError(null)
  }

  if (error && !isSubmitting) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={errorHandler}
      />
    )
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={data ? data : selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})
