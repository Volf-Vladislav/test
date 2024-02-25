import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import createRequest from '../../helpers/createRequest'

interface CounterState {
  ids: string[],
  request: object,
  currentStep: number
}

const initialState: CounterState = {
  ids: [],
  request: createRequest('get_ids', {}),
  currentStep: 50
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
    },
    increaseStep: (state) => {
      state.currentStep += 50
    }
  }
})

export const { changeDisplayProducts, changeRequest } = productSlice.actions
export default productSlice.reducer