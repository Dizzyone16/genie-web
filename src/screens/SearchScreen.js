import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

// store
import SearchStore from '../stores/SearchStore'

// component
import LoadingIndicator from '../components/LoadingIndicator'
import Header from '../components/tab/Header'
import ProductCard from '../components/ProductCard'

const SearchScreen = observer(() => {
  const [query, setQuery] = useState('')

  const handleSearch = async (query) => {
    SearchStore?.handleSearch(query)
  }

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
