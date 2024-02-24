import { useEffect, useState } from 'react'

import Card from './components/templates/Card'

import Product from './types/Product'
import postRequest from './api/postRequest'

import '../src/scss/main.scss'

const data = {
  action: 'get_items',
  params: { ids: ['1789ecf3-f81c-4f49-ada2-83804dcc74b0'] },
}

const App = () => {
  const [first, setfirst] = useState<Array<Product>>([])

  useEffect(() => {
    postRequest(data)
      .then(data => {
        setfirst(data.result)
        console.log(data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className=''>
      {first.map(item => (
        <Card
          price={item.price}
          id={item.id}
          brand={item.brand}
          product={item.product}
        />
      ))}
    </div>
  )
}

export default App
