import { makeObservable, observable, action } from 'mobx'

class AuthStore {
  token = ''
  constructor() {
    makeObservable(this, {
      token: observable,
      setToken: action,
    })
  }

  setToken(token) {
    this.token = token
  }

  async loadToken() {
    if (this?.token === '') {
      const userToken = await localStorage.getItem('@webToken')
      if (userToken) {
        this.setToken(userToken)

        return userToken
      }
    }
    return this.token
  }
}

export default new AuthStore()
