import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { GlobalStyles } from '../constants/styles'
import Button from '../UI/Button'
import DatesForm from '../components/ChangeDatesRange/DatesForm'

export default function ChangeDatesRange({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Select the date range for which you want to view your expenses
      </Text>
      <DatesForm />
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={() => navigation.goBack()}>
          Back
        </Button>
        <Button
          style={styles.button}
          onPress={() => {}}>
          Confirm
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  title: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  button: {
    width: '30%',
    marginHorizontal: 20,
  },
})
