import AuthStore from '../stores/AuthStore'

const updateHeader = (options) => {
  const updatedOptions = { ...options }

  if (AuthStore?.token !== '') {
    updatedOptions.headers = {
      ...updatedOptions.headers,
      'x-access-token': AuthStore?.token,
    }
  }

  return updatedOptions
}

export default async function fetchWrapper(url, options) {
  return fetch(url, updateHeader(options))
}
