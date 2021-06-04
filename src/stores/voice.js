import * as Speak from 'expo-speech'

export class VoiceStore {
  constructor() {
    this.rate = 1 // double between [0.25-2]
    this.pitch = 1 // double between [0.25-2]
    this.volume = 1
    this.autoSpeak = false
    this.speaker = Speak
  }

  setRate(newRate) {
    this.rate = newRate
  }

  setPitch(newPitch) {
    this.pitch = newPitch
  }

  setVolume(newVolume) {
    this.volume = newVolume
  }

  setAutoSpeak(value) {
    this.autoSpeak = value
  }

  toggleAutoSpeak() {
    this.autoSpeak = !this.autoSpeak
  }

  speak(text, language) {
    // check if whether the speaker utility is currently speaking, stop it
    if (this.speaker.isSpeakingAsync()) {
      this.speaker.stop()
    }

    const options = {
      language: language ? language : 'en',
      rate: this.rate,
      pitch: this.pitch,
      volume: this.volume,
    }

    this.speaker.speak(text, options)
  }
}
