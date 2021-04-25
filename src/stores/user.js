import { action, observable, runInAction } from 'mobx'
import { auth } from '../api/firebase'

export class UserStore {
  @observable email = ''
  @observable isLoggedIn = false

  constructor() {}

  @action
  async signUp(email, password) {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password)
    const user = userCredential.user
    runInAction(() => {
      this.email = user.email
    })
  }

  @action
  async signInWithPassword(email, password) {
    const userCredential = await auth.signInWithEmailAndPassword(email, password)
    const user = userCredential.user
    runInAction(() => {
      this.email = user.email
      this.isLoggedIn = true
    })
  }
}
