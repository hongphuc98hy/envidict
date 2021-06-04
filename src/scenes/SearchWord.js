import AsyncStorage from '@react-native-async-storage/async-storage'
import { Body, Icon, Left, List, ListItem, Right, Text, View } from 'native-base'
import React, { useContext, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import SearchHeader from '../components/molecules/main-layout/SearchHeader'
import { dictStoreContext, voiceStoreContext } from '../contexts'
import { routeNames } from '../navigations/route-names'

const SearchWord = ({ navigation }) => {
  const [key, setKey] = useState('')
  const [wordList, setWordList] = useState([])

  const dictStore = useContext(dictStoreContext)
  const voiceStore = useContext(voiceStoreContext)

  const searchByKey = async (text) => {
    const result = await dictStore.findWords(text)
    setWordList(result)
  }

  const onGoToWordView = (word) => {
    navigation.navigate(routeNames.WordView, { word: word })
  }

  const onGoToOnlineTranslation = (text) => {
    navigation.navigate(routeNames.OnlineTranslation, { initText: text })
  }

  const onPressRow = async (word) => {
    try {
      let recentWords = JSON.parse(await AsyncStorage.getItem('recentWords')) ?? []
      recentWords.push(word.word)
      recentWords = [...new Set(recentWords)]
      await AsyncStorage.setItem('recentWords', JSON.stringify(recentWords))
      onGoToWordView(word)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      <SearchHeader
        voiceButtonIsVisible={true}
        searchByKey={searchByKey}
        setWordList={setWordList}
        setKey={setKey}
        autoFocus={true}
      ></SearchHeader>
      <ScrollView>
        <List>
          {wordList.length > 0 &&
            wordList.map((word, i) => (
              <ListItem key={i} onPress={() => onPressRow(word)} icon>
                <Left>
                  <Icon name="magnify" type="MaterialCommunityIcons" />
                </Left>
                <Body>
                  <Text>{word.word}</Text>
                </Body>
                <Right>
                  <TouchableOpacity onPress={() => voiceStore.speak(word.word)}>
                    <Icon name="volume-high" />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            ))}
          {key !== '' && (
            <ListItem icon onPress={() => onGoToOnlineTranslation(key)}>
              <Left>
                <Icon name="translate" type="MaterialCommunityIcons" />
              </Left>
              <Body>
                <Text>{key}</Text>
              </Body>
            </ListItem>
          )}
        </List>
      </ScrollView>
    </View>
  )
}

export default SearchWord
