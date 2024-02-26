import { useCallback, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeRequest } from '../../redux/productSlice/productSlice'

import postRequest from '../../api/postRequest'
import BrandCount from '../../types/BrandCount'
import createRequest from '../../helpers/createRequest'
import { countBrandRepeats } from '../../helpers/productsHelper'

const ControlPanel = () => {
  const [brands, setBrands] = useState<Array<BrandCount>>([])
  const [price, setPrice] = useState<number>(0)

  const dispatch = useDispatch()

  const postNewRequest = useCallback((brand:string) => {
    dispatch(changeRequest(createRequest('filter', { brand })))
  }, [dispatch])

  const nullFilters = () => {
    setPrice(0)
    dispatch(changeRequest(createRequest('get_ids', {})))
  }

  const getItemsByPrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(changeRequest(createRequest('filter', { price })))
  }

  useLayoutEffect(() => {
    const getBrands = () => {
      postRequest({
        action: 'get_fields',
        params: { field: 'brand' },
      })
        .then(data => setBrands(countBrandRepeats(data.result)))
        .catch(err => {
          console.error(err)
        })
    }

    getBrands()
  }, [brands])

  return (
    <div className='controlPanel'>
      <div className='nullFilter'>
        <p>Обнулить все фильтры</p>
        <button onClick={nullFilters}>Ок</button>
      </div>
      <form
        className='priceFilter'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => getItemsByPrice(e)}
      >
        <div className='title'>Поиск по цене</div>
        <input
          type='number'
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
        />
        <button type='submit'>Найти</button>
      </form>
      <div className='brandlist'>
        <p className='title'>Нажмите на интересующий бренд</p>
        {brands.map((item, i) => (
          <div
            className='brand'
            key={i}
            onClick={() => postNewRequest(item.name)}
          >
            {item.name} - {item.repeats}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ControlPanel
