import { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import Card from '../../components/templates/Card'
import Product from '../../types/Product'
import Dropdown from '../templates/Dropdown'
import Pagination from '../ui/Pagination'

import createRequest from '../../helpers/createRequest'
import postRequest from '../../api/postRequest'
import { removeDuplicates } from '../../helpers/productsHelper'

enum PageState {
  loading = 1,
  noResults = 2,
  ready = 3,
  error = 4,
}

const MainPage = () => {
  const [items, setItems] = useState<Array<Product>>([])
  const [state, setState] = useState<number>(PageState.loading)

  const ids = useSelector((state: RootState) => state.product.ids)
  const {step, current} = useSelector((state: RootState) => state.product.pagination)

  useLayoutEffect(() => {
    const sendRequest = () => {
      setState(PageState.loading)
      setItems([])

      postRequest(
        createRequest('get_items', {
          ids: ids.slice(
            current,
            current + step,
          ),
        }),
      )
        .then(data => {
          const nornalizeArray = removeDuplicates(data.result, 'id')

          setItems(nornalizeArray)
          setState(PageState.ready)
        })
        .catch(err => {
          setState(PageState.error)
          console.error(err)
          sendRequest()
        })
    }

    if (ids.length !== 0) {
      sendRequest()
    } else {
      setState(PageState.noResults)
    }
  }, [ids, current, step])

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
          <div className='sortButton'>
            <p>Отсортировать по</p>
            <Dropdown items={['Цене ↓', 'Цене ↑', 'Бренду', 'Названию']} />
          </div>
          <div className='wrapp'>
            {items.map((item, i) => (
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
  }
}

export default MainPage
