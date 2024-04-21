import { createSlice } from '@reduxjs/toolkit';
import { dataInitialState } from '../../consts/global';


export const dataSlice = createSlice({
  name: 'DATA',
  initialState: dataInitialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      // .addCase(getProductsList.fulfilled, (state, action) => { // getProductsList
      //   state.productsList.data = action.payload;
      //   state.productsList.status = Status.downloaded;
      // })
  },
});

