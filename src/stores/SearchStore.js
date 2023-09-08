import { makeObservable, observable, action } from 'mobx'
import backendApi from '../utils/backendApi'

class SearchStore {
  isLoading = false
  isSearched = false
  searchResult = []

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isSearched: observable,
      searchResult: observable,

      setIsLoading: action,
      setIsSearched: action,
      setSearchResult: action,
    })
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading
  }

  setIsSearched(isSearched) {
    this.isSearched = isSearched
  }

  setSearchResult(searchResult) {
    this.searchResult = searchResult
  }

  async handleSearch(query) {
    if (query.trim() === '') {
      return
    }
    this.setIsSearched(true)
    this.setIsLoading(true)
    this.setSearchResult([])
    const result = await backendApi?.getSearchResults(query, 0)
    if (result?.status === 200) {
      if (result?.data?.length > 0) {
        this.setSearchResult(result?.data)
      }
    }
    this.setIsLoading(false)
    backendApi?.logEvent('search', { query: query })
  }
}

export default new SearchStore()
