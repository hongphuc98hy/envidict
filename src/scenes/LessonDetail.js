import { Button, Icon } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LessonContent from '../components/atoms/lesson/LessonContent'
import { routeNames } from '../navigations/route-names'
import { Colors, Mixins, Typography } from '../styles'

const LessonDetail = ({ navigation }) => {
  const onClickLearnNow = () => {
    navigation.navigate(routeNames.LearnNow)
  }

  return (
    <View style={styles.container}>
      <LessonContent />
      <Button info style={styles.buttonLearn} onPress={onClickLearnNow}>
        <Text style={styles.textButton}>HỌC NGAY</Text>
        <Icon name="doubleright" type="AntDesign" style={styles.icon} />
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonLearn: {
    position: 'absolute',
    bottom: 0,
    width: Mixins.WINDOW_WIDTH,
    justifyContent: 'center',
    backgroundColor: Colors.BLUE_DARK,
  },
  textButton: {
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
  },
  icon: {
    fontSize: 12,
    color: Colors.WHITE,
    marginLeft: 5,
  },
})
export default LessonDetail
