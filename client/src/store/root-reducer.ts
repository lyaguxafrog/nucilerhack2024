import { combineReducers } from '@reduxjs/toolkit';
import { ReducerNameSpaces } from '../consts/enums';
import { dataSlice } from './data-slice/data-slice-reducer';


export const rootReducer = combineReducers({
  [ReducerNameSpaces.data]: dataSlice.reducer,
});
