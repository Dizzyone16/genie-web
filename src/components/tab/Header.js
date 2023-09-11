import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// images
import BackImage from '../../images/Back.png'
import SearchImage from '../../images/Search.png'

const Header = ({ headerType, title, query, handleSearch }) => {
  const maxWidth = 480
  const screenWidth =
    window?.innerWidth >= maxWidth ? maxWidth : window?.innerWidth
  const navigate = useNavigate()

  const [text, setText] = useState(query ? query : '')

  const renderHeaderContent = () => {
    switch (headerType) {
      case 'search':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderRadius: 12,
              alignItems: 'center',
              marginLeft: 12,
              backgroundColor: '#F2F3F5',
              justifyContents: 'center',
              width: screenWidth - 40 - 43,
              height: 44,
            }}
          >
            {/* Replace this with your Search image */}
            <img
              src={SearchImage}
              style={{ width: '16px', height: '15px', marginLeft: '14px' }}
              alt='search'
            />
            <input
              type='search'
              autoComplete='search'
              style={{
                flex: 1,
                fontSize: '16px',
                borderRadius: 12,
                padding: '8px 15px',
                height: 32,
                color: 'black',
                border: 'none',
                backgroundColor: '#F2F3F5',
                outline: 'none',
              }}
              placeholder='상품을 검색해보세요'
              value={text}
              onChange={(e) => {
                setText(e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(text)
                }
              }}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        width: screenWidth - 40,
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        height: 55,
        zIndex: 999,
        alignItems: 'center',
      }}
    >
      <button
        style={{
          backgroundColor: 'white',
          border: 'none',
        }}
        onClick={() => navigate(-1)}
      >
        <img
          src={BackImage}
          style={{ width: '11px', height: '18px' }}
          alt='back'
        />
      </button>
      <div style={{ flex: 1, alignItems: 'center' }}>
        {renderHeaderContent()}
      </div>
    </div>
  )
}

export default Header
