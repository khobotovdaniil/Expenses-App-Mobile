import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import ExpensesContextProvider from './store/expenses-context'
import ManageExpense from './screens/ManageExpense'
import RecentExpenses from './screens/RecentExpenses'
import AllExpenses from './screens/AllExpenses'
import ChangeDatesRange from './screens/ChangeDatesRange'
import { GlobalStyles } from './constants/styles'
import IconButton from './UI/IconButton'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()
const Recent = createNativeStackNavigator()

function RecentStack() {
  return (
    <Recent.Navigator screenOptions={{}}>
      <Recent.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{ headerShown: false }}
      />
      <Recent.Screen
        name="ChangeDatesRange"
        component={ChangeDatesRange}
        options={{
          presentation: 'modal',
          title: 'Change Range of Dates',
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary200,
          },
        }}
      />
    </Recent.Navigator>
  )
}

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense')
            }}
          />
        ),
      })}>
      <BottomTabs.Screen
        name="RecentStack"
        component={RecentStack}
        options={({ navigation }) => ({
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="hourglass"
              size={size}
              color={color}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="calendar-sharp"
              size={24}
              color="white"
              onPress={() => {
                navigation.navigate('ChangeDatesRange')
              }}
            />
          ),
        })}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{ presentation: 'modal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  )
}
