import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalT, StoreT } from '../utilities/types';



const initialState: StoreT = {
  isModalVisible: false,
  scoresData: [],
}

export const productsSlice = createSlice({
  name: 'rootReducer',
  initialState,
  reducers: {
    resetState: () => initialState,

    setModalVisible: (state: StoreT, action: PayloadAction<any>) => {
      state.isModalVisible = action.payload
    },

    addScore: (state: StoreT, action: PayloadAction<any>) => {
      state.scoresData.push(action.payload)
    },


  },
})

// Action creators are generated for each case reducer function
export const { resetState, setModalVisible, addScore } = productsSlice.actions

export default productsSlice.reducer