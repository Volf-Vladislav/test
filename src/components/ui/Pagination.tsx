import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import createRequest from '../../helpers/createRequest'
import { useEffect } from 'react'

const Pagination = () => {
  return (
    <div className='pagination'>
      <button className='prevPage'>Предыдущая страница</button>
      <button className='nextPage'>Следующая страница</button>
    </div>
  )
}

export default Pagination
