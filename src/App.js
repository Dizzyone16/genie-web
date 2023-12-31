import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './App.css'

// utils
import backendApi from './utils/backendApi.js'

// store
import AuthStore from './stores/AuthStore.js'

// components
import ProductDetailScreen from './screens/ProductDetailScreen.js'
import SearchScreen from './screens/SearchScreen.js'
import HomeScreen from './screens/HomeScreen.js'
import InterviewRequestModal from './components/modal/InterviewRequestModal'

function App() {
  const { pathname } = useLocation()

  // 유저의 이탈 및 백그라운드도 추적할 수 있으면 좋겠다

  useEffect(() => {
    const handleInitialToken = async () => {
      try {
        const existingToken = await AuthStore?.loadToken()

        if (!existingToken) {
          const result = await backendApi.issueWebToken()

          if (result?.token && result?.userId) {
            console.log(result?.token, result?.token)
            AuthStore?.setToken(result?.token)
            localStorage.setItem('@webToken', result?.token)
            // await UserStore?.setUserId(result?.userId)

            backendApi.logEvent('login')
          }
        } else {
          console.log('Token already exists in localStorage')
          backendApi.logEvent('login')
        }
      } catch (err) {
        console.err(err)
      }
    }

    handleInitialToken()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div id='app-container'>
      {/* <Helmet>
        <meta
          name='naver-site-verification'
          content='8796c93f60f744dcffe57b825a1949fd2b9c0017'
        />
      </Helmet> */}
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
      <Routes>
        <Route path='/search' element={<SearchScreen />} />
      </Routes>
      <Routes>
        <Route path='/catalog' element={<ProductDetailScreen />} />
      </Routes>
      <InterviewRequestModal />
    </div>
  )
}

export default App
