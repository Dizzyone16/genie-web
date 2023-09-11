import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import queryString from 'query-string'

// store
import SearchStore from '../stores/SearchStore'
import { useLocation, useNavigate, useParams } from 'react-router'

// component
import LoadingIndicator from '../components/LoadingIndicator'
import Header from '../components/tab/Header'
import ProductCard from '../components/ProductCard'

const SearchScreen = observer(() => {
  const { queryParam } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState(queryParam ? queryParam : '')

  const handleSearch = async (query) => {
    setQuery(query)
    SearchStore?.handleSearch(query)
  }

  useEffect(() => {
    const initializeSearch = async () => {
      if (location.search) {
        const parsed = queryString.parse(location.search)
        const query = parsed?.query

        if (query) {
          SearchStore.handleSearch(query)
        }
      }
    }
    initializeSearch()
  }, [location.search])

  useEffect(() => {
    if (query) {
      navigate(`/search?query=${query}`)
    }
  }, [query])

  return (
    <div
      style={{
        backgroundColor: 'white',
        minHeight: '100vh',
        width: window?.innerWidth,
      }}
    >
      <Header
        headerType={'search'}
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {SearchStore?.isLoading && <LoadingIndicator />}

      {SearchStore?.isSearched && !SearchStore?.isLoading ? (
        SearchStore?.searchResult?.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
            검색 결과가 없어요
          </p>
        ) : (
          <div style={{ paddingTop: 59 }}>
            <div>
              <p
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: 600,
                  marginTop: 32,
                  marginBottom: 22,
                  marginLeft: 25,
                }}
              >
                최저가비교
              </p>
            </div>
            <div style={{ marginLeft: 25, marginRight: 25 }}>
              {SearchStore?.searchResult.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
            </div>
          </div>
        )
      ) : null}
    </div>
  )
})

export default SearchScreen
