import React, { useEffect } from 'react'
import { Alert, BackHandler } from 'react-native'
import Courses from '../components/atoms/courses/Courses'
import MainLayout from '../components/templates/MainLayout'
import { routeNames } from '../navigations/route-names'
import { backHandleToExitApp } from '../utils'

const Learning = ({ navigation }) => {
  useEffect(() => {
    backHandleToExitApp(Alert, BackHandler)
  }, [])

  const handleNavigate = (courseId, image) => {
    navigation.navigate(routeNames.LessonList, { courseId: courseId, image: image })
  }

  return (
    <MainLayout autoFocusSearchInput={false} voiceButtonIsVisible={true}>
      <Courses
        key={'course 1'}
        coursesName="Ôn luyện giao tiếp cơ bản"
        onGoToLessonDetail={handleNavigate}
      />
      <Courses
        key={'course 2'}
        coursesName="Ôn luyện TOEIC"
        onGoToLessonDetail={handleNavigate}
      />
    </MainLayout>
  )
}

export default Learning
