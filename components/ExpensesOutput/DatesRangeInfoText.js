import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

export default function DatesRangeInfoText({ from, to }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          From <Text style={styles.accentText}>{from}</Text>
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          to <Text style={styles.accentText}>{to}</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: GlobalStyles.colors.primary700,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary400,
    marginHorizontal: 20,
  },
  text: {
    color: 'white',
  },
  accentText: {
    fontSize: 16,
    color: GlobalStyles.colors.accent500,
  },
})
