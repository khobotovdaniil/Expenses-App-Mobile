import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Button from '../../UI/Button'
import Input from './Input'
import { getFormattedDate } from '../../util/date'
import { GlobalStyles } from '../../constants/styles'

export default function ExpenseForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    descr: {
      value: defaultValues ? defaultValues.descr : '',
      isValid: true,
    },
  })

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs(currentInputs => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    })
  }

  function submitHandler() {
    let [day, month, year] = inputs.date.value.split(/[-,.,/,\, ]/)
    const fullYear = year => {
      return year && year.length < 3 ? +`20${year}` : +year
    }

    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(fullYear(year), +month - 1, +day),
      descr: inputs.descr.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount !== 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descrIsValid = expenseData.descr.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descrIsValid) {
      setInputs(currentInputs => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          descr: { value: currentInputs.descr.value, isValid: descrIsValid },
        }
      })
      return
    }

    onSubmit(expenseData)
  }

  const errorText = (!inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.descr.isValid) && (
    <Text style={styles.errorText}>
      Invalid input values - please check your endered data!
    </Text>
  )

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'DD-MM-YYYY',
            keyboardType: 'decimal-pad',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.descr.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: true,
          autoCapitalize: 'sentences',
          onChangeText: inputChangedHandler.bind(this, 'descr'),
          value: inputs.descr.value,
        }}
      />
      {errorText}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
    marginBottom: 16,
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
