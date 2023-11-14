import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
  from,
  to,
}) {
  const text =
    from && to ? (
      <>
        <Text style={styles.infoText}>{fallbackText}</Text>
        <Text style={styles.infoText}>
          from <Text style={styles.accentText}>{from}</Text> to{' '}
          <Text style={styles.accentText}>{to}</Text>
        </Text>
      </>
    ) : (
      <Text style={styles.infoText}>{fallbackText}</Text>
    )

  let content = <View style={styles.textContainer}>{text}</View>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={expenses}
        periodName={expensesPeriod}
      />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  textContainer: {
    marginTop: 40,
  },
  infoText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  accentText: {
    color: GlobalStyles.colors.accent500,
    fontSize: 20,
  },
})
