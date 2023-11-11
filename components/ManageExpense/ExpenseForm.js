import React from 'react'
import { View, StyleSheet } from 'react-native'

import Input from './Input'

export default function ExpenseForm() {
  const amountChangedHandler = () => {}

  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangedHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: 'DD-MM-YYYY',
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: true,
          autoCapitalize: 'sentences',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
