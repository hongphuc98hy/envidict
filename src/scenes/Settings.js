import { Body, Button, Content, Icon, Left, ListItem, Right, Switch } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, BackHandler, StyleSheet, Text } from 'react-native'
import MainLayout from '../components/templates/MainLayout'
import { voiceStoreContext } from '../contexts'
import { Colors, Typography } from '../styles'
import { backHandleToExitApp } from '../utils'

const Frame = (props) => {
  const { enable, nameIcon, toggleSwitch, content } = props

  return (
    <ListItem icon>
      <Left>
        <Button info>
          <Icon active name={nameIcon} />
        </Button>
      </Left>
      <Body>
        <Text>{content}</Text>
      </Body>
      <Right>
        <Switch
          value={enable}
          onValueChange={toggleSwitch}
          thumbColor={enable ? Colors.BLUE_LIGHT : Colors.BLUE_TRANSLATE}
        />
      </Right>
    </ListItem>
  )
}

const Settings = () => {
  const voiceStore = useContext(voiceStoreContext)
  const [stateEnable, setStateEnable] = useState({
    quickSearch: false,
    sound: !voiceStore.autoSpeak,
    notification: false,
    alertEveryDay: false,
  })

  const toggleSwitch = (key, value) => {
    setStateEnable({
      ...stateEnable,
      [key]: value,
    })
  }

  const extractFrameProps = (key) => {
    if (key === 'sound') {
      voiceStore.toggleAutoSpeak()
    }
    return {
      enable: stateEnable[key],
      toggleSwitch: (val) => toggleSwitch(key, val),
    }
  }

  useEffect(() => {
    backHandleToExitApp(Alert, BackHandler)
  }, [])

  return (
    <MainLayout autoFocusSearchInput={false} voiceButtonIsVisible={true}>
      <Content>
        <Text style={styles.textTile}>Sound</Text>
      </Content>
      <Frame
        {...extractFrameProps('sound')}
        nameIcon="volume-high"
        content="Tự động phát âm"
        enable={stateEnable.sound}
      />
    </MainLayout>
  )
}
const styles = StyleSheet.create({
  textTile: {
    color: Colors.BLUE_LIGHT,
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: 'bold',
    padding: 20,
  },
  contentStyle: {
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_16,
  },
})
export default Settings
