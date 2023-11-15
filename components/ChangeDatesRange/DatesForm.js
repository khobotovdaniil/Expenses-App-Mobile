import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

import Button from '../../UI/Button'
import Input from '../ManageExpense/Input'
import { GlobalStyles } from '../../constants/styles'
import {
  createDateFromString,
  getFormattedDate,
  dateIsValid,
} from '../../util/date'

export default function DatesForm({ onCancel, onSubmit, from, to }) {
  const [dates, setDates] = useState({
    from: {
      value: from,
      isValid: true,
    },
    until: {
      value: to,
      isValid: true,
    },
  })

  const submitHandler = () => {
    const datesRange = {
      from: createDateFromString(dates.from),
      until: createDateFromString(dates.until),
    }

    if (!dateIsValid(datesRange.from) || !dateIsValid(datesRange.until)) {
      setDates(currentInputs => {
        return {
          from: {
            value: currentInputs.from.value,
            isValid: dateIsValid(datesRange.from),
          },
          until: {
            value: currentInputs.until.value,
            isValid: dateIsValid(datesRange.until),
          },
        }
      })
      return
    }

    onSubmit(datesRange)
  }

  const inputChangedHandler = (name, value) => {
    setDates(currentInputs => {
      return {
        ...currentInputs,
        [name]: { value, isValid: true },
      }
    })
  }

  const onPickerChange = (tag, event, selectedDate) => {
    inputChangedHandler(tag, getFormattedDate(selectedDate))
  }

  const showDatepicker = (stateName, tag) => {
    DateTimePickerAndroid.open({
      value: dateIsValid(createDateFromString(stateName))
        ? createDateFromString(stateName)
        : new Date(),
      onChange: onPickerChange.bind(this, tag),
      mode: 'date',
      is24Hour: true,
    })
  }

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.rowContainer}>
            <Input
              style={styles.input}
              label="From"
              invalid={!dates.from.isValid}
              textInputConfig={{
                placeholder: 'DD-MM-YYYY',
                keyboardType: 'decimal-pad',
                maxLength: 10,
                onChangeText: inputChangedHandler.bind(this, 'from'),
                value: dates.from.value,
              }}
            />
            <Button
              style={styles.button}
              onPress={showDatepicker.bind(this, dates.from, 'from')}>
              Pick Date
            </Button>
          </View>
          <View style={styles.rowContainer}>
            <Input
              style={styles.input}
              label="Until"
              invalid={!dates.until.isValid}
              textInputConfig={{
                placeholder: 'DD-MM-YYYY',
                keyboardType: 'decimal-pad',
                maxLength: 10,
                onChangeText: inputChangedHandler.bind(this, 'until'),
                value: dates.until.value,
              }}
            />
            <Button
              style={styles.button}
              onPress={showDatepicker.bind(this, dates.until, 'until')}>
              Pick Date
            </Button>
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.formButtons}>
        <Button
          style={styles.formButton}
          mode="flat"
          onPress={onCancel}>
          Back
        </Button>
        <Button
          style={styles.formButton}
          onPress={submitHandler}>
          Confirm
        </Button>
      </View>
    </>
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
    width: 160,
  },
  button: {
    marginTop: 20,
    width: 100,
  },
  formButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  formButton: {
    width: '30%',
    marginHorizontal: 20,
  },
})
