import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.js'

import './App.css'
import SearchScreen from './screens/SearchScreen.js'
import backendApi from './utils/backendApi.js'
import AuthStore from './stores/AuthStore.js'
import ProductDetailScreen from './screens/ProductDetailScreen.js'

function App() {
  useEffect(() => {
    // 1. localStorage에 token이 있는지 확인
    // 2. 있는 경우 - pass, 없는 경우 - backend에서 jwt 토큰 발급
    // 없는 경우
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

            // backendApi.logEvent('login')
          }
        } else {
          // AuthStore?.setToken(result?.token)
          console.log()

          console.log('Token already exists in localStorage')
        }
      } catch (err) {
        console.err(err)
      }
    }

    handleInitialToken()
  }, [])

  return (
    <div id='app-container'>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
      <Routes>
        <Route path='/search' element={<SearchScreen />} />
      </Routes>
      <Routes>
        <Route
          path='/catalog/:catalogNumber'
          element={<ProductDetailScreen />}
        />
      </Routes>
    </div>
  )
}

export default App
