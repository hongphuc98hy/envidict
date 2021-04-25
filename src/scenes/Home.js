import { Button, Icon, Text, View } from 'native-base'
import React, { useEffect } from 'react'
import { Alert, BackHandler, StyleSheet } from 'react-native'
import CurrentVocabularies from '../components/molecules/home/CurrentVocabularies'
import RecentWords from '../components/molecules/home/RecentWords'
import WordOfTheDay from '../components/molecules/word/WordOfTheDay'
import MainLayout from '../components/templates/MainLayout'
import { routeNames } from '../navigations/route-names'
import { Colors } from '../styles'
import { backHandleToExitApp } from '../utils'

const Home = ({ navigation }) => {
  useEffect(() => {
    backHandleToExitApp(Alert, BackHandler)
  }, [])

  const onGoToWordView = (data) => {
    navigation.navigate(routeNames.WordView, { word: data })
  }

  const onClickPreView = () => {
    navigation.navigate(routeNames.LessonDetail)
  }

  const onClickPractise = (id, courseId) => {
    navigation.navigate(routeNames.MainLearning, { id: id, courseId: courseId })
  }

  const onClickOnlineTranslationButton = () => {
    navigation.navigate('Dịch online', '')
  }

  const onClickLearnNow = () => {
    navigation.navigate(routeNames.LearnNow)
  }

  const onGoToSearchView = () => {
    navigation.navigate(routeNames.SearchWord)
  }
  return (
    <MainLayout
      autoFocusSearchInput={false}
      voiceButtonIsVisible={true}
      onGoToSearchView={onGoToSearchView}
    >
      <WordOfTheDay onGoToWordView={onGoToWordView} />
      <RecentWords onGoToWordView={onGoToWordView} />
      <View style={styles.buttonWrapper}>
        <Button
          style={buttonStyle}
          onPress={onClickOnlineTranslationButton}
          iconLeft
          block
          rounded
        >
          <Icon name="translate" type="MaterialCommunityIcons" />
          <Text style={styles.buttonText} uppercase={false}>
            Dịch online
          </Text>
        </Button>
      </View>
      <CurrentVocabularies
        onClickPreView={onClickPreView}
        onClickPractise={onClickPractise}
        onClickLearnNow={onClickLearnNow}
        id={'abc'}
        index={0}
        courseId={'mnq'}
        wordIds={['1', '2', '3', '4', '5', '6', '7', '3', '4', '5']}
      />
    </MainLayout>
  )
}

const buttonStyle = {
  backgroundColor: Colors.BLUE_DARK,
  width: 200,
  marginBottom: 25,
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Colors.BLACK,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderTopColor: Colors.WHITE,
  },
  buttonText: {
    fontSize: 16,
  },
})

export default Home
