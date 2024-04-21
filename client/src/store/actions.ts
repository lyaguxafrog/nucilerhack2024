import { createAsyncThunk } from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';
import { AppDispatch, RegisterInput, SaveKeysInput, SaveKeysOutput, State, SyncPrivateKeyInput, SyncPrivateKeyOutput, Token, TokenAuthInput, TokenAuthOutput, VerifyedTokenData } from '../types/data-types';

type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
}

let headers = {
  Authorization: `Bearer Null`,
 };
let endpoint = new GraphQLClient("https://nuclier.makridenko.ru/api/");

async function updateGraphqlData(jwtToken: string) {
  headers = {
    Authorization: `Bearer ${jwtToken}`
  }
}

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
      const payload = await endpoint.request(query, {}, headers);
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
      console.log(data);
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