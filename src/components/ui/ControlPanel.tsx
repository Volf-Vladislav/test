import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeRequest } from '../../redux/productSlice/productSlice'

import postRequest from '../../api/postRequest'

const ControlPanel = () => {
  const [brands, setBrands] = useState<string[]>([])
  const [price, setPrice] = useState<number>(0)
  const dispatch = useDispatch()

  const postNewRequest = (req: string) => {
    dispatch(
      changeRequest({
        action: 'filter',
        params: { brand: req },
      }),
    )
  }

  const nullFilters = () => {
    dispatch(
      changeRequest({
        action: 'get_ids',
        params: { offset: 0, limit: 50 },
      }),
    )
  }

  const getItemsByPrice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      changeRequest({
        action: 'filter',
        params: { price },
      }),
    )
  }

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await postRequest({
          action: 'get_fields',
          params: { field: 'brand' },
        })
        const data = response.result
        const uniqueBrands = [...new Set(data)]

        setBrands(uniqueBrands)
      } catch (error) {
        console.error('Error fetching brands:', error)
      }
    }

    fetchBrands()
  }, [])

  return (
    <div className='controlPanel'>
      <div className='nullFilter' onClick={nullFilters}>
        <p>Обнулить все фильтры</p>
      </div>
      <form className='priceFilter' onSubmit={getItemsByPrice}>
        <div className='title'>Поиск по цене</div>
        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button type="submit">Найти</button>
      </form>
      <div className='brandlist'>
        <p className='title'>Нажмите на интересующий бренд</p>
        {brands.map((item, i) => (
          <div className='brand' key={i} onClick={() => postNewRequest(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ControlPanel