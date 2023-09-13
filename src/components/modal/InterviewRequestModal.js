import React from 'react'
import Modal from 'react-modal'
import { observer } from 'mobx-react-lite'

// css
import './InterviewRequestModal.css'

// store
import UserStore from '../../stores/UserStore'
import backendApi from '../../utils/backendApi'

const InterviewRequestModal = observer(() => {
  const maxWidth = 480
  const screenWidth =
    window?.innerWidth >= maxWidth ? maxWidth : window?.innerWidth
  const modalWidth = screenWidth - 100

  Modal.setAppElement('#root')

  return (
    <div>
      <Modal
        isOpen={UserStore?.modalOpen}
        onRequestClose={() => {
          UserStore?.setModalOpen(false)
          backendApi.logEvent('interview_response', {
            response: 'closed',
          })
        }}
        style={{
          content: {
            width: modalWidth,
          },
        }}
        className='Modal'
        overlayClassName='Overlay'
        closeTimeoutMS={200}
      >
        <div className='modal-title'>
          지니에서의 최저가 검색은
          <br />
          어떠셨나요?
        </div>
        <div className='modal-content-container'>
          <div className='modal-content'>
            지니는 현재 초기 서비스 운영 중이에요.
          </div>
          <div className='modal-content'>서비스 후기를 알려주시면</div>
          <div className='modal-content'>스타벅스 아메리카노를 드려요 🎁</div>
        </div>

        <div className='modal-button-container'>
          <button
            className='modal-button modal-button-secondary'
            onClick={() => {
              UserStore?.setModalOpen(false)
              backendApi.logEvent('interview_response', { response: 'denied' })
            }}
          >
            다음에 하기
          </button>
          <button
            className='modal-button modal-button-primary'
            onClick={() => {
              window.open('https://forms.gle/niRG2YcRcY7ggPvc7', '_blank')
              UserStore?.setModalOpen(false)
              backendApi.logEvent('interview_response', {
                response: 'accepted',
              })
            }}
          >
            참여하기
          </button>
        </div>
      </Modal>
    </div>
  )
})

export default InterviewRequestModal
