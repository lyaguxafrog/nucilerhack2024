import { createAsyncThunk } from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';
import { AppDispatch, RegisterInput, State, Token } from '../types/data-types';

type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
}

const endpoint = new GraphQLClient("https://nuclier.makridenko.ru/api/");

//export const setTimerSeconds = createAction<number>('setTimerSeconds');

export const genSeed = createAsyncThunk(
  "GEN_SEED",
  async (_, { rejectWithValue }) => {
    try {
      const query = `
        {
          genSeed
        }
      `;
      const payload = await endpoint.request(query);

      console.log(payload);
      return payload;
    } catch (err) {
      console.log('err');
      return rejectWithValue(err);
    }
  }
);

export const registerUser = createAsyncThunk<Token, {registerInput: RegisterInput}, ThunkConfig>(
  "REGISTER_USER",
  async ({ registerInput }, { rejectWithValue }) => {
    try {
      const query = `
        mutation { 
          registerUser(
            email: "${registerInput.email}",
            seed: "${registerInput.seed}"
          ) {
            token
          }
        }
      `;
      const data = await endpoint.request<Token>(query);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSignup = createAsyncThunk<any, {signupInput: any}, ThunkConfig>(
  "USER_SIGNUP",
  async ({ signupInput }, { rejectWithValue }) => {
    try {
      const query = `
        mutation { 
          registerUser(
            input: { 
              username: "${signupInput.username}",
              email: "${signupInput.email}",
              password: "${signupInput.password}",
              repeatPassword: "${signupInput.password}"
            }) { profile { id username email } token } }
      `;
      const data = await endpoint.request<SignupData>(query);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);