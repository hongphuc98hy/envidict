import { useNavigation } from '@react-navigation/native'
import { Icon, Input, Item } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { routeNames } from '../../../navigations/route-names'
import { Colors } from '../../../styles'

const SearchInput = (props) => {
  const [text, setText] = useState('')

  const navigator = useNavigation()

  const { searchByKey, autoFocus, setWordList, setKey, isVocabularySearch } = props
  return (
    <Item rounded style={styles.searchInput}>
      <Icon name="search" />
      <Input
        placeholder="Gõ từ để tra từ điển"
        autoFocus={autoFocus}
        onFocus={() => {
          if (isVocabularySearch !== true) {
            navigator.navigate(routeNames.SearchWord)
          }
        }}
        onChangeText={(text) => {
          setText(text)
          searchByKey(text)
          setKey(text)
        }}
        value={text}
        autoCapitalize={'none'}
      />
      <TouchableOpacity
        onPress={() => {
          if (setKey && setText && setWordList) {
            setText('')
            setKey('')
            setWordList([])
          }
        }}
      >
        <Icon name="close" />
      </TouchableOpacity>
    </Item>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    marginVertical: 10,
  },
})

export default SearchInput
