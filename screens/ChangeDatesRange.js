import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { GlobalStyles } from '../constants/styles'
import DatesForm from '../components/ChangeDatesRange/DatesForm'
import { DatesContext } from '../store/dates-context'

export default function ChangeDatesRange({ navigation }) {
  const datesCtx = useContext(DatesContext)

  const confirmHandler = formData => {
    datesCtx.changeDates(formData)
    navigation.goBack()
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Select the date range for which you want to view your expenses
      </Text>
      <DatesForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />
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
})
