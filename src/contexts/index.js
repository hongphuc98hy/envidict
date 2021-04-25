import { createContext } from 'react'
import { DictStore, TopicStore, UserStore, VoiceStore } from '../stores'

export const dictStoreContext = createContext(new DictStore())
export const topicStoreContext = createContext(new TopicStore())
export const userStoreContext = createContext(new UserStore())
export const voiceStoreContext = createContext(new VoiceStore())
