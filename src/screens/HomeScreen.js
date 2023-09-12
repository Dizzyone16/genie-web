import React, { useState } from 'react'
import './HomeScreen.css'
import LoadingIndicator from '../components/LoadingIndicator'
import { Link, useNavigate } from 'react-router-dom'
import SearchStore from '../stores/SearchStore'

const maxWidth = 480

const ListItem = ({ text }) => (
  <Link to={`/search?query=${text}`} style={{ textDecoration: 'none' }}>
    <li
      style={{
        fontSize: 12,
        listStyleType: 'none',
        fontWeight: 600,
        borderRadius: 24,
        borderColor: '#f2f3f5',
        borderWidth: 1.5,
        borderStyle: 'solid',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        marginRight: 8,
        marginBottom: 8,
        color: 'black',
      }}
    >
      {text}
    </li>
  </Link>
)

const HiddenH1 = () => (
  <h1 style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
    클릭 두 번이면 끝나는 간편한 최저가검색, 지니
  </h1>
)

const HomeScreen = () => {
  const screenWidth =
    window?.innerWidth >= maxWidth ? maxWidth : window?.innerWidth

  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')

  const genie = require('../images/Genie.png')
  const search = require('../images/Search.png')

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${searchQuery}`)
      console.log(`Navigate or filter products based on: ${searchQuery}`)
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <HiddenH1 />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 25,
          marginTop: 60,
        }}
      >
        <div className='text-container'>
          <div>
            <p>찾으시는 상품,</p>
            <p>클릭 두 번만에 찾아보세요</p>
          </div>
          <img src={genie} alt='Genie' style={{ width: 120, height: 40 }} />
        </div>

        <div className='search-container' style={{ width: screenWidth - 50 }}>
          <img
            src={search}
            alt='Search'
            style={{ width: 16.25, height: 15.75, marginLeft: 14 }}
          />
          <input
            className='search-input'
            type='search'
            autoComplete='search'
            placeholder='상품을 검색해보세요'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div
          style={{
            marginTop: 50,
          }}
        >
          <div>
            <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
              추천 검색어
            </p>
          </div>
          <ul
            style={{
              marginTop: 16,
              display: 'flex',
              flexWrap: 'wrap',
              paddingLeft: 0,
            }}
          >
            <ListItem text='삼다수 2L 6개' />
            <ListItem text='오뚜기 컵누들 30개' />
            <ListItem text='햇반 210g 24개' />
            <ListItem text='정관장 홍삼정 30개입' />
            <ListItem text='시디즈 T50 라이트' />
          </ul>
        </div>
      </div>
      {SearchStore?.isLoading && <LoadingIndicator />}
    </div>
  )
}

export default HomeScreen
