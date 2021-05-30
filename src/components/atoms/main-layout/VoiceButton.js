import { Button, Icon, Item } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from '../../../styles'

const VoiceButton = () => {
  return (
    <Item style={styles.voiceItem}>
      <Button rounded style={styles.button}>
        <Icon name="mic" style={styles.icon} />
      </Button>
    </Item>
  )
}

const styles = StyleSheet.create({
  voiceItem: {
    alignSelf: 'center',
  },
  button: {
    backgroundColor: Colors.BLUE_DARK,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  icon: {
    color: Colors.WHITE,
  },
})

export default VoiceButton
