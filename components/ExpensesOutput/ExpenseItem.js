import React from 'react'
import { StyleSheet, Pressable, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { GlobalStyles } from '../../constants/styles'
import { getFormattedDate } from '../../util/date'

export default function ExpenseItem({ descr, amount, date, id }) {
  const navigation = useNavigation()

  const expensePressHandler = () => {
    navigation.navigate('ManageExpense', {
      expenseId: id,
    })
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={expensePressHandler}
        style={({ pressed }) => pressed && styles.pressed}
        android_ripple={{ color: GlobalStyles.colors.gray500 }}>
        <View style={styles.expenseItem}>
          <View>
            <Text style={[styles.textBase, styles.description]}>{descr}</Text>
            <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
})
