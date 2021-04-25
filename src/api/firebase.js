import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDuVs4fMylajYaD400oHVKGtXZW3FT9Xss',
  authDomain: 'envidict-4c249.firebaseapp.com',
  databaseURL: 'https://envidict-4c249.firebaseio.com',
  projectId: 'envidict-4c249',
  storageBucket: 'envidict-4c249.appspot.com',
  messagingSenderId: '17743148956',
  appId: '1:17743148956:web:967ea767205aee123a3a59',
  measurementId: 'G-X1497GR21T',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const firestoreDb = firebase.firestore()
export const auth = firebase.auth()
