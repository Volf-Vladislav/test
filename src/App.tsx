import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from './redux/store'
import { changeDisplayProducts } from './redux/productSlice/productSlice'

import Header from './components/templates/Header'
import MainPage from './components/pages/MainPage'
import ControlPanel from './components/ui/ControlPanel'

import postRequest from './api/postRequest'
import { removeSame } from './helpers/productsHelper'

import '../src/scss/main.scss'

const App = () => {
  const request = useSelector((state: RootState) => state.product.request)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    postRequest(request)
      .then(data => {
        const uniqueIds = removeSame(data.result)
        dispatch(changeDisplayProducts(uniqueIds))
      })
      .catch(err => console.error(err))
  }, [request, dispatch])

  return (
    <main>
      <Header />
      <MainPage />
      <ControlPanel />
    </main>
  )
}

export default App
