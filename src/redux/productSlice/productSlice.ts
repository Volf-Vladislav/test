import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  ids: string[],
  request: object
}

const initialState: CounterState = {
  ids: [],
  request: {
    action: "get_ids",
    params: { "offset": 0, "limit": 50 }
  }
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
    }
  }
})

export const { changeDisplayProducts, changeRequest } = productSlice.actions
export default productSlice.reducer