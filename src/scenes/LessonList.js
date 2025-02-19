import { Button, Icon, Separator } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ListItemCourses from '../components/atoms/courses/ListItemCourses'
import Lesson from '../components/atoms/lesson/Lesson'
import CurrentVocabularies from '../components/molecules/home/CurrentVocabularies'
import Loading from '../components/organisms/common/Loading'
import MainLayout from '../components/templates/MainLayout'
import { topicStoreContext } from '../contexts'
import { routeNames } from '../navigations/route-names'
import { Topic } from '../stores/topic'
import { Colors } from '../styles'

const LessonList = (props) => {
  // const {} =
  const coursesId = props.route.params.courseId
  const image = props.route.params.image
  const [course, setCourse] = useState(new Topic())
  const [currentLesson, setCurrentLesson] = useState({
    id: '',
    courseId: '',
    wordIds: [],
    index: 0,
  })

  const [loading, setLoading] = useState(true)

  const topicStore = useContext(topicStoreContext)

  useEffect(() => {
    const setUp = async () => {
      setLoading(true)
      const currentCourse = topicStore.topics.find((topic) => topic.id === coursesId)
      await currentCourse.fetch()
      setCourse(currentCourse)
      setCurrentLesson({
        courseId: currentCourse.lessons[0].topicId,
        wordIds: currentCourse.lessons[0].wordIds,
        id: currentCourse.lessons[0].id,
        index: currentCourse.lessons.findIndex(
          (lesson) => (lesson.id = currentCourse.lessons[0].id)
        ),
      })
      setLoading(false)
    }
    setUp()
  }, [coursesId])

  const onClickPreView = () => {
    props.navigation.navigate(routeNames.LessonDetail)
  }

  const onClickPractise = (id, courseId) => {
    props.navigation.navigate(routeNames.MainLearning, {
      id: id,
      courseId: courseId,
    })
  }

  const onClickLearnNow = () => {
    props.navigation.navigate(routeNames.LearnNow)
  }

  return (
    <MainLayout autoFocusSearchInput={false}>
      {loading && <Loading />}
      {!loading && (
        <>
          <View style={styles.listItemCourses}>
            <ListItemCourses
              image={image}
              title={course.name}
              subTitle={`Số bài học: ${course.lessonIds.length}`}
            />
          </View>

          <Button
            bordered
            info
            style={styles.buttonChange}
            onPress={() => {
              props.navigation.push(routeNames.Learning)
            }}
          >
            <Icon name="exchange-alt" type="FontAwesome5" style={styles.iconChange} />
            <Text style={{ color: Colors.BLUE_LIGHT }}>Chọn bộ từ khác</Text>
          </Button>
          <CurrentVocabularies
            onClickPreView={onClickPreView}
            onClickPractise={onClickPractise}
            onClickLearnNow={onClickLearnNow}
            id={currentLesson.id}
            index={currentLesson.index}
            courseId={currentLesson.courseId}
            wordIds={currentLesson.wordIds}
          />
          <Separator>
            <Text style={styles.tittle}>Danh sách bài đã học</Text>
          </Separator>
          {course.lessons
            .filter((lesson) => lesson.id !== currentLesson.id)
            .map((lesson, i) => (
              <Lesson
                key={lesson.id}
                courseId={coursesId}
                lessonId={lesson.id}
                index={i}
                name={`Bài ${i + 1}`}
              />
            ))}
        </>
      )}
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  buttonChange: {
    height: 35,
    right: 0,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginRight: 15,
    paddingRight: 10,
  },
  iconChange: {
    fontSize: 13,
    color: Colors.BLUE_LIGHT,
  },
  tittle: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  listItemCourses: {
    paddingLeft: 10,
    paddingTop: 10,
  },
})
export default LessonList
