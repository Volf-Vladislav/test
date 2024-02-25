import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import Card from '../../components/templates/Card'
import postRequest from '../../api/postRequest'
import Product from '../../types/Product'

import { removeDuplicates } from '../../helpers/productsHelper'

const MainPage = () => {
  const [items, setItems] = useState<Array<Product>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const ids = useSelector((state: RootState) => state.product.ids)

  useEffect(() => {
    if (ids.length !== 0) {
      setLoading(true)
      postRequest({
        action: 'get_items',
        params: { ids: ids },
      })
        .then(data => {
          const uniqueItems = removeDuplicates(data.result, 'id')
          setItems(uniqueItems)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [ids])

  return (
    <div className='mainPage'>
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        items.map(item => (
          <Card
            key={item.id}
            price={item.price}
            id={item.id}
            brand={item.brand}
            product={item.product}
          />
        ))
      )}
    </div>
  )
}

export default MainPage