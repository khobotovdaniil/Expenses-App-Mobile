import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Button from './Button'
import { GlobalStyles } from '../constants/styles'

export default function ErrorOverlay({ message, onConfirm, onRepeat }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          onPress={onConfirm}>
          Okay
        </Button>
        {onRepeat && (
          <Button
            style={styles.button}
            onPress={onRepeat}>
            Try Again
          </Button>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 8,
  },
})
