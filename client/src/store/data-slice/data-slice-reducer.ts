import { createSlice } from '@reduxjs/toolkit';


export const dataSlice = createSlice({
  name: 'DATA',
  initialState: '',
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

