import { makeObservable, observable, action } from 'mobx'

class UserStore {
  modalOpen = false

  constructor() {
    makeObservable(this, {
      modalOpen: observable,

      setModalOpen: action,
    })
  }

  setModalOpen(modalOpen) {
    this.modalOpen = modalOpen
  }
}

export default new UserStore()
