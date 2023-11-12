import React, { useState } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'

import Button from '../../UI/Button'
import Input from './Input'
import { getFormattedDate } from '../../util/date'

export default function ExpenseForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    descr: defaultValues ? defaultValues.descr : '',
  })

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputValues(currentInputValues => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      }
    })
  }

  const submitHandler = () => {
    let [day, month, year] = inputValues.date.split('-')

    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(+year, +month - 1, +day),
      descr: inputValues.descr,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount !== 0
    const dateIsValid =
      new Date(+year, +month - 1, +day).toString() !== 'Invalid Date'
    const descrIsValid = expenseData.descr.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descrIsValid) {
      Alert.alert('Invalid input', 'Please check your input values')
      return
    }

    onSubmit(expenseData)
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'DD-MM-YYYY',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: true,
          autoCapitalize: 'sentences',
          onChangeText: inputChangedHandler.bind(this, 'descr'),
          value: inputValues.descr,
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={onCancel}>
          Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})
