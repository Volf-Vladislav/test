import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../redux/store'
import { changePaginationState } from '../../redux/productSlice/productSlice'

import PaginationType from '../../types/Pagination'

const Pagination = () => {
  const { current, step } = useSelector(
    (state: RootState) => state.product.pagination,
  )
  const ids = useSelector((state: RootState) => state.product.ids)

  const dispatch = useDispatch()

  const calculatePagination = (
    current: number,
    step: number,
  ): PaginationType => {
    return {
      current,
      step,
    }
  }

  const nextPage = () => {
    dispatch(changePaginationState(calculatePagination(current + step, step)))
  }

  const prevPage = () => {
    dispatch(changePaginationState(calculatePagination(current - step, step)))
  }

  return (
    <div className='pagination'>
      {current > 0 && (
        <button className='prevPage' onClick={prevPage}>
          Предыдущая страница
        </button>
      )}
      {ids.length > current + step && (
        <button className='nextPage' onClick={nextPage}>
          Следующая страница
        </button>
      )}
    </div>
  )
}

export default Pagination
