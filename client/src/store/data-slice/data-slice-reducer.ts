import { createSlice } from '@reduxjs/toolkit';
import { allKeys, genSeed, setUsername, tokenGet } from '../actions';

export const dataSlice = createSlice({
  name: 'DATA',
  initialState: {
    username: '',
    seed: '',
    tokenGet: false,
    keysData: {
      keys: [{
        id: '',
        service: ''
      }],
      success: false
    },
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(setUsername, (state, action) => {
        state.username = action.payload;
      })
      .addCase(genSeed.fulfilled, (state, action) => {
        state.seed = action.payload
      })
      .addCase(allKeys.fulfilled, (state, action) => {
        state.keysData = action.payload
      })
      .addCase(tokenGet, (state, action) => {
        state.tokenGet = action.payload
      })
  },
});

