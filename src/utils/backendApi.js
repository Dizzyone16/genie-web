import fetchWrapper from './fetchWrapper'

const backendUrl = 'https://genious.co.kr'

// const backendUrl = 'http://127.0.0.1:3001'
// const backendUrl = 'http://localhost:3001'

class BackendApi {
  async issueWebToken() {
    try {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
      const url = `${backendUrl}/user/issue-web-token`
      const res = await fetch(url, options)
      const data = await res.json()
      console.log(`login data : ${JSON.stringify(data)}`)
      return data
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async getKakaoUserInfo(accessToken) {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
      const res = await fetch(`https://kapi.kakao.com/v2/user/me`, options)
      const data = await res.json()
      console.log(`kakao user data is: `, data)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  async getSearchResults(query) {
    if (!query) {
      return
    }
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      }
      const url = `${backendUrl}/user/search`

      const res = await fetchWrapper(url, options)
      const data = await res.json()
      console.log(`search data : ${JSON.stringify(data)}`)
      return data
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async getProductDetailData(catalogNumber) {
    if (!catalogNumber) {
      return
    }
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catalogNumber }),
      }
      const url = `${backendUrl}/user/catalog`
      const res = await fetchWrapper(url, options)
      const data = await res.json()
      console.log(`catalog data : ${JSON.stringify(data)}`)
      return data
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async getProductOptionData(catalogNumber, optionNumber) {
    if (!catalogNumber || !optionNumber) {
      return
    }
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catalogNumber, optionNumber }),
      }
      const url = `${backendUrl}/user/catalog/option`
      const res = await fetchWrapper(url, options)
      const data = await res.json()
      console.log(`catalog option data : ${JSON.stringify(data)}`)
      return data
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async logEvent(eventType, eventData) {
    if (!eventType) {
      return
    }
    try {
      const eventDataWithSource = {
        ...eventData,
        source: 'web',
      }

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType, eventData: eventDataWithSource }),
      }
      const url = `${backendUrl}/data/log-event`
      await fetchWrapper(url, options)
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export default new BackendApi()
