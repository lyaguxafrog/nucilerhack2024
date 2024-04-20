import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, ProductData, State } from '../types/data-types';
import { APIRoutes } from '../consts/api-routes';

type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const getProductsList = createAsyncThunk<ProductData[], undefined, ThunkConfig>(
  'GET_PRODUCTS_LIST',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<ProductData[]>(APIRoutes.GetProductsList());
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
