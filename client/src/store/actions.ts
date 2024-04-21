import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';
import { AllKeys, AppDispatch, RegisterInput, SaveKeysInput, SaveKeysOutput, State, SyncPrivateKeyInput, SyncPrivateKeyOutput, Token, TokenAuthInput, TokenAuthOutput, VerifyedTokenData } from '../types/data-types';

type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
}

let headers = {
  Authorization: `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzZGFhc2FzZGFzZHNkMTIzMSIsImV4cCI6MTcxMzY4OTM4Miwib3JpZ0lhdCI6MTcxMzY4OTA4Mn0.qjNJkA4PBVvHgYOZmDZZztdwrz1TsjYatixtcbUDzs4`,
 };
let endpoint = new GraphQLClient("https://nuclier.makridenko.ru/api/");

async function updateGraphqlData(jwtToken: string) {
  headers = {
    Authorization: `JWT ${jwtToken}`
  }
}


export const genSeed = createAsyncThunk(
  "GEN_SEED",
  async (_, { rejectWithValue }) => {
    try {
      const query = `
        {
          genSeed
        }
      `;
      const payload = await endpoint.request<string>(query, {}, headers);
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
      const token = await endpoint.request<Token>(query, {}, headers);
      updateGraphqlData(token);
      console.log(token);
      return token;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const verifyToken = createAsyncThunk<VerifyedTokenData, {token: Token}, ThunkConfig>(
  "VERIFY_TOKEN",
  async ({ token }, { rejectWithValue }) => {
    try {
      const query = `
        mutation { 
          verifyToken(token: "${token}") { payload }
        }
      `;
      const data = await endpoint.request<VerifyedTokenData>(query, {}, headers);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);


export const tokenAuth = createAsyncThunk<TokenAuthOutput, {tokenAuthInput: TokenAuthInput}, ThunkConfig>(
  "TOKEN_AUTH",
  async ({ tokenAuthInput }, { rejectWithValue }) => {
    try {
      const query = `
        mutation { 
          tokenAuth(
            username: "${tokenAuthInput.username}",
            password: "${tokenAuthInput.password}"
          ) { payload, refreshExpiresIn, token }
        } 
      `;
      const data = await endpoint.request<TokenAuthOutput>(query, {}, headers);
      updateGraphqlData(data.token);
      tokenGet(true);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const saveKeys = createAsyncThunk<SaveKeysOutput, {saveKeysInput: SaveKeysInput}, ThunkConfig>(
  "SAVE_KEYS",
  async ({ saveKeysInput }, { rejectWithValue }) => {
    try {
      const query = `
        mutation { 
          saveKeys(
            privateKey: "${saveKeysInput.privateKey}"
            publicKey: "${saveKeysInput.publicKey}"
            service: "${saveKeysInput.service}"
          ) {success}
        }
      `;
      const data = await endpoint.request<SaveKeysOutput>(query, {}, headers);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const syncPrivateKey = createAsyncThunk<SyncPrivateKeyOutput, {syncPrivateKeyInput: SyncPrivateKeyInput}, ThunkConfig>(
  "SYNC_PRIVATE_KEY",
  async ({ syncPrivateKeyInput }, { rejectWithValue }) => {
    try {
      const query = `
        mutation {
          syncPrivateKey(service: "${syncPrivateKeyInput.service}")
          { success, privateKey }
        }
      `;
      const token = await endpoint.request<SyncPrivateKeyOutput>(query, {}, headers);
      console.log(token);
      return token;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const allKeys = createAsyncThunk(
  "ALL_KEYS",
  async (_, { rejectWithValue }) => {
    try {
      const mutation = `
        mutation {
          allKeys {
            success
            keys {
              id
              service
            }
          }
        }
      `;
      const payload = await endpoint.request(mutation, {}, headers) as AllKeys;
      console.log(payload);
      return payload;
    } catch (err) {
      console.log('err');
      return rejectWithValue(err);
    }
  }
);

export const deleteKey = createAsyncThunk<{success: boolean}, {syncPrivateKeyInput: { service: string }}, ThunkConfig>(
  "DELETE_KEY",
  async ({ syncPrivateKeyInput }, { rejectWithValue }) => {
    try {
      const query = `
        mutation {
          deleteKey(service: "${syncPrivateKeyInput.service}")
          { success }
        }
      `;
      const token = await endpoint.request<{success: boolean}>(query, {}, headers);
      console.log(token);
      return token;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const setUsername = createAction<string>('setUsername');
export const setKeysData = createAction<AllKeys>('setKeysData');
export const tokenGet = createAction<boolean>('tokenGet');

