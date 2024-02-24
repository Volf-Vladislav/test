import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'

import { changeProducts } from './redux/productSlice/productSlice'

import MainPage from './components/pages/MainPage'

import postRequest from './api/postRequest'

import '../src/scss/main.scss'

const data = {
  action: 'get_ids',
  params: { offset: 1, limit: 10 },
}

const App = () => {
  const dispatch = useDispatch()
  console.log('App render')

  useLayoutEffect(() => {
    postRequest(data)
      .then(data => dispatch(changeProducts(data.result)))
      .catch(err => console.error(err))
  }, [dispatch])

  return <MainPage />
}

export default App
