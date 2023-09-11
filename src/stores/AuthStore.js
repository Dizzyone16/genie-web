import { makeObservable, observable, action } from 'mobx'

class AuthStore {
  token = ''
  isTokenInitialized = false

  constructor() {
    makeObservable(this, {
      token: observable,
      isTokenInitialized: observable,
      setToken: action,
      setIsTokenInitialized: action,
    })
  }

  setToken(token) {
    this.token = token
  }

  setIsTokenInitialized(isTokenInitialized) {
    this.isTokenInitialized = isTokenInitialized
  }

  async loadToken() {
    if (this?.token === '') {
      const userToken = await localStorage.getItem('@webToken')
      if (userToken) {
        this?.setToken(userToken)

        return userToken
      }
    }
    this?.setIsTokenInitialized(true)
    return this?.token
  }
}

export default new AuthStore()
