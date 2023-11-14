import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
// import DateTimePicker from '@react-native-community/datetimepicker';

import Button from '../../UI/Button'
import Input from '../ManageExpense/Input'
import { GlobalStyles } from '../../constants/styles'
import { getFormattedDate, getDateMinusDays } from '../../util/date'

export default function DatesForm({ onCancel, onSubmit }) {
  const today = new Date()

  const [dates, setDates] = useState({
    from: {
      value: getFormattedDate(getDateMinusDays(today, 7)),
      isValid: true,
    },
    until: {
      value: getFormattedDate(today),
      isValid: true,
    },
  })

  const submitHandler = () => {
    let [fromDay, fromMonth, fromYear] = dates.from.value.split(/[-,.,/,\, ]/)
    let [untilDay, untilMonth, untilYear] =
      dates.until.value.split(/[-,.,/,\, ]/)

    const fullYear = year => {
      return year && year.length < 3 ? +`20${year}` : +year
    }

    const datesRange = {
      from: new Date(fullYear(fromYear), +fromMonth - 1, +fromDay),
      until: new Date(fullYear(untilYear), +untilMonth - 1, +untilDay),
    }

    const dateIsValid = item => {
      return item.toString() !== 'Invalid Date'
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

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showMode = (currentMode) => {
  //   DateTimePickerAndroid.open({
  //     value: date,
  //     onChange,
  //     mode: currentMode,
  //     is24Hour: true,
  //   });
  // };

  return (
    <>
      <View style={styles.container}>
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
            onPress={() => {}}>
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
            onPress={() => {}}>
            Pick Date
          </Button>
        </View>
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
    width: '40%',
  },
  button: {
    marginTop: 20,
    width: '30%',
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
