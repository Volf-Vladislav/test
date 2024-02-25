import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import Card from '../../components/templates/Card'
import postRequest from '../../api/postRequest'
import Product from '../../types/Product'

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

  useEffect(() => {
    if (ids.length !== 0) {
      setState(PageState.loading)
      postRequest({
        action: 'get_items',
        params: { ids: ids },
      })
        .then(data => {
          const uniqueItems = removeDuplicates(data.result, 'id')
          setItems(uniqueItems)
          setState(PageState.ready)
        })
        .catch(err => {
          console.error(err)
          setState(PageState.error)
        })
    } else {
      setState(PageState.noResults)
    }
  }, [ids])

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
          {items.map(item => (
            <Card
              key={item.id}
              price={item.price}
              id={item.id}
              brand={item.brand}
              product={item.product}
            />
          ))}
        </div>
      )
    }
    case 4: {
      return <div className='error'>Не удалось получить данные с сервера</div>
    }
  }
}

export default MainPage
