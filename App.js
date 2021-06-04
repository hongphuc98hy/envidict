import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decode, encode } from 'base-64'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { Root } from 'native-base'
import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { topicStoreContext, voiceStoreContext } from './src/contexts'
import { StackNavigator } from './src/navigations/StackNavigator'

if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}

const App = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const topicStore = useContext(topicStoreContext)
  const voiceStore = useContext(voiceStoreContext)
  topicStore.fetch()

  if (!isLoaded) {
    return (
      <AppLoading
        startAsync={async () => await loadResources(voiceStore)}
        onFinish={() => setIsLoaded(true)}
        onError={(error) => console.error(error)}
      />
    )
  }

  return (
    <Root>
      <View style={styles.container}>
        <StackNavigator />
      </View>
    </Root>
  )
}

const loadResources = async (voiceStore) => {
  await Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  })

  let voiceSettings = JSON.parse(await AsyncStorage.getItem('envidictVoiceSettings'))
  if (voiceSettings) {
    voiceStore.setRate(voiceSettings.rate)
    voiceStore.setPitch(voiceSettings.pitch)
    voiceStore.setVolume(voiceSettings.volume)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
