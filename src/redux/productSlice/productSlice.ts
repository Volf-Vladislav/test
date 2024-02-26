import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import createRequest from '../../helpers/createRequest'
import Pagination from '../../types/Pagination'

const STEP:number = 50

interface CounterState {
  ids: string[],
  request: object,
  pagination: Pagination
}

const initialState: CounterState = {
  ids: [],
  request: createRequest('get_ids', {}),
  pagination: { step: STEP,  current: 0 }
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeDisplayProducts: (state, action: PayloadAction<Array<string>>) => {
      state.ids = action.payload
    },
    changeRequest: (state, action: PayloadAction<object>) => {
      state.request = action.payload
      state.pagination = { step: STEP,  current: 0 }
    },
    changePaginationState: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload
    }
  }
})

export const { changeDisplayProducts, changeRequest, changePaginationState } = productSlice.actions
export default productSlice.reducer