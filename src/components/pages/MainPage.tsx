import { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import Card from '../../components/templates/Card'

import postRequest from '../../api/postRequest'
import Product from '../../types/Product'

const MainPage = () => {
  const [items, setItems] = useState<Array<Product>>([])
  const ids = useSelector((state: RootState) => state.product.ids)
  console.log('Main page render')

  useLayoutEffect(() => {
    postRequest({
      action: 'get_items',
      params: { ids: ids },
    })
      .then(data => setItems(data.result))
      .catch(err => console.error(err))
  }, [ids])

  return (
    <div className='mainPage'>
      {items.map(item => (
        <Card
          key={Math.random()}
          price={item.price}
          id={item.id}
          brand={item.brand}
          product={item.product}
        />
      ))}
    </div>
  )
}

export default MainPage
