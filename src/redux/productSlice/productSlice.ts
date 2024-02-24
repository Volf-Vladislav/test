import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  ids: string[]
}

const initialState: CounterState = {
    ids: [],
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeProducts: (state, action: PayloadAction<Array<string>>) => {
        state.ids = action.payload
    }
  },
})

export const { changeProducts } = productSlice.actions
export default productSlice.reducer