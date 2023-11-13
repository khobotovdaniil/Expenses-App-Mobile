import React from 'react'
import { StyleSheet, View } from 'react-native'

import Button from '../../UI/Button'
import Input from '../ManageExpense/Input'
import { GlobalStyles } from '../../constants/styles'

export default function DatesForm() {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Input
          style={styles.input}
          label="From"
          textInputConfig={{
            placeholder: 'DD-MM-YYYY',
            keyboardType: 'decimal-pad',
            maxLength: 10,
          }}
        />
        <Button style={styles.button}>Pick Date</Button>
      </View>
      <View style={styles.rowContainer}>
        <Input
          style={styles.input}
          label="Until"
          textInputConfig={{
            placeholder: 'DD-MM-YYYY',
            keyboardType: 'decimal-pad',
            maxLength: 10,
          }}
        />
        <Button style={styles.button}>Pick Date</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginTop: 8,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.primary200,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: '40%',
  },
  button: {
    marginTop: 20,
    width: '30%',
  },
})
