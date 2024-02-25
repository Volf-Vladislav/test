import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { changeProducts } from './redux/productSlice/productSlice'

import Header from './components/templates/Header'
import MainPage from './components/pages/MainPage'
import ControlPanel from './components/pages/ControlPanel'
import Footer from './components/templates/Footer'

import postRequest from './api/postRequest'

import '../src/scss/main.scss'

const data = {
  action: 'get_ids',
  params: { offset: 0, limit: 49 },
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    postRequest(data)
      .then(data => dispatch(changeProducts(data.result)))
      .catch(err => console.error(err))
  }, [dispatch])

  return (
    <main>
      <Header />
      <MainPage />
      <ControlPanel />
      <Footer />
    </main>
  )
}

export default App
