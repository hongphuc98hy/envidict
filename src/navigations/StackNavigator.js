import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import SettingsRight from '../components/atoms/navigations/SettingsRight'
import { userStoreContext } from '../contexts'
import Learning from '../scenes/Learning'
import LearnNow from '../scenes/LearnNow'
import LessonDetail from '../scenes/LessonDetail'
import LessonList from '../scenes/LessonList'
import ListWord from '../scenes/ListWord'
import MainLearning from '../scenes/MainLearning'
import OnlineTranslation from '../scenes/OnlineTranslation'
import SearchWord from '../scenes/SearchWord'
import { SignIn } from '../scenes/SignIn'
import { SignUp } from '../scenes/SignUp'
import WordView from '../scenes/WordView'
import { Colors } from '../styles'
import BottomTabNavigator from './BottomTabNavigator'
import { routeNames } from './route-names'

const Stack = createStackNavigator()

const headerOptions = {
  headerStyle: {
    backgroundColor: Colors.BLUE_DARK,
    height: 60,
  },
  headerTitleStyle: {
    color: Colors.WHITE,
  },
  headerTintColor: Colors.WHITE,
  headerRight: () => <SettingsRight />,
}

const StackNavigator = observer(() => {
  const userStore = useContext(userStoreContext)

  if (!userStore.isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={routeNames.SignIn}
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={routeNames.SignUp}
            component={SignUp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="App"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routeNames.Learning}
          component={Learning}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routeNames.WordView}
          component={WordView}
          options={headerOptions}
        />
        <Stack.Screen
          name={routeNames.SearchWord}
          component={SearchWord}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name={routeNames.LessonDetail}
          component={LessonDetail}
          options={headerOptions}
        />
        <Stack.Screen
          name={routeNames.LessonList}
          component={LessonList}
          options={headerOptions}
        />
        <Stack.Screen
          name={routeNames.LearnNow}
          component={LearnNow}
          options={headerOptions}
        />
        <Stack.Screen
          name={routeNames.MainLearning}
          component={MainLearning}
          options={headerOptions}
        />
        <Stack.Screen
          name={routeNames.ListWord}
          component={ListWord}
          options={headerOptions}
        />
        <Stack.Screen
          name={routeNames.OnlineTranslation}
          component={OnlineTranslation}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
})

export { StackNavigator }
