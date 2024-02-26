import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'

import Card from '../../components/templates/Card'
import Product from '../../types/Product'
import Dropdown from '../templates/Dropdown'
import Pagination from '../ui/Pagination'

import createRequest from '../../helpers/createRequest'
import postRequest from '../../api/postRequest'
import { removeDuplicates, sortBy } from '../../helpers/productsHelper'

import PageState from '../../enums/PageState'
import DropNames from '../../enums/DropNames'

const MainPage = () => {
  const [items, setItems] = useState<Array<Product>>([])
  const [state, setState] = useState<number>(PageState.loading)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>('')
  const { step, current } = useSelector(
    (state: RootState) => state.product.pagination,
  )
  const controllerRef = useRef<AbortController | null>(null)
  const ids = useSelector((state: RootState) => state.product.ids)
  const dispatch = useDispatch()

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    const controller = new AbortController()
    controllerRef.current = controller

    const sendRequest = () => {
      postRequest(createRequest('get_items', { ids }), controller.signal)
        .then(data => {
          const normalizedArray = removeDuplicates(data.result, 'id')
          setItems(sortBy(normalizedArray, selectedItem))
          setState(PageState.ready)
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            return
          }
          setState(PageState.error)
          console.error(err)
          sendRequest()
        })
    }

    if (ids.length !== 0) {
      setState(PageState.loading)
      sendRequest()
    } else setState(PageState.noResults)

    return () => {
      controller.abort()
    }
  }, [ids, current, selectedItem, dispatch])

  switch (state) {
    case 1: {
      return <div className='loading'>Получаем данные...</div>
    }
    case 2: {
      return <div className='noResults'>По данному фильтру нет результатов</div>
    }
    case 3: {
      return (
        <div className='mainPage'>
          <Dropdown
            items={[
              DropNames.first,
              DropNames.second,
              DropNames.third,
              DropNames.fourth,
            ]}
            open={isDropdownOpen}
            selectedItem={selectedItem}
            setOpen={setIsDropdownOpen}
            setSelectedItem={setSelectedItem}
          />

          <div className='wrapp'>
            {items.slice(current, current + step).map((item, i) => (
              <Card
                key={item.id + i}
                price={item.price}
                id={item.id}
                brand={item.brand}
                product={item.product}
              />
            ))}
          </div>

          <Pagination />
        </div>
      )
    }
    case 4: {
      return <div className='error'>Ошибка сервера, обновление</div>
    }
    default:
      return null
  }
}

export default MainPage
