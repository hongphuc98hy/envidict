import { List, Spinner, Text, View } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import WordItem from '../components/atoms/ListItemVocabulary/WordItem'
import SearchHeader from '../components/molecules/main-layout/SearchHeader'
import { dictStoreContext } from '../contexts'
import { routeNames } from '../navigations/route-names'
import { Colors, Mixins, Typography } from '../styles'

const wordList = [
  'good',
  'allocate',
  'compatible',
  'delete',
  'delete',
  'duplicate',
  'failure',
  'ignore',
  'figure',
  'search',
  'happy',
  'money',
  'terrible',
  'sunday',
  'important',
  'excellent',
  'bye',
  'cat',
  'hear',
  'carrot',
  'bean',
  'engine',
  'identification',
  'master',
  'cousin',
  'tolerant',
  'outfit',
  'fear',
  'stride',
  'firm',
  'kit',
  'perform',
  'deposit',
  'memory',
]

const ListWord = ({ navigation }) => {
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)
  const [key, setKey] = useState('')
  const [viewWords, setViewWords] = useState(words)

  const dictStore = useContext(dictStoreContext)

  useEffect(() => {
    let data = []
    setLoading(true)
    const setUp = async () => {
      for (let i = 0; i < wordList.length; i++) {
        const result = await dictStore.findWord(wordList[i])
        if (result !== undefined) {
          data.push(result)
        }
      }

      setWords(data)
      setViewWords(data)
      setLoading(false)
    }
    setUp()
  }, [])

  const onPressListItem = (word) => {
    navigation.navigate(routeNames.WordView, { word: word })
  }

  const searchByKey = async (key) => {
    if (key === '') {
      setViewWords(words)
    } else {
      const headIncludeWords = await words.filter((word) => word.word.indexOf(key) === 0)
      const otherWords = await words.filter((word) => word.word.indexOf(key) > 0)
      setViewWords([...headIncludeWords, ...otherWords])
    }
  }

  return (
    <View>
      <SearchHeader searchByKey={searchByKey} setKey={setKey} isVocabularySearch={true} />
      {loading ? (
        <View style={styles.container}>
          <Spinner color={Colors.BLUE_DARK} />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <ScrollView>
          <List>
            {viewWords.length > 0 &&
              viewWords.map((word, i) => {
                return (
                  <WordItem
                    key={'word' + i}
                    word={word}
                    onPressListItem={onPressListItem}
                  />
                )
              })}
          </List>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: Mixins.WINDOW_HEIGHT,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.BLUE_TEXT,
    textAlign: 'center',
  },
})

export default ListWord
