import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from './redux/store'
import { changeDisplayProducts } from './redux/productSlice/productSlice'

import Header from './components/templates/Header'
import MainPage from './components/pages/MainPage'
import ControlPanel from './components/ui/ControlPanel'
import Pagination from './components/ui/Pagination'

import postRequest from './api/postRequest'

import '../src/scss/main.scss'

const App = () => {
  const request = useSelector((state: RootState) => state.product.request)
  const dispatch = useDispatch()

  useEffect(() => {
    postRequest(request)
      .then(data => dispatch(changeDisplayProducts(data.result)))
      .catch(err => console.error(err))
  }, [request])

  return (
    <main>
      <Header />
      <MainPage />
      <ControlPanel />
      <Pagination />
    </main>
  )
}

export default App
