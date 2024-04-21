import { store } from "../store";

export type VerifyedTokenData = {
  username: string;
  exp: number;
  origIat: number;
}
export type RegisterInput = {
  email: string;
  seed: string;
}
export type TokenAuthInput = {
  username: string;
  password: string;
}
export type TokenAuthOutput = {
  payload: string;
  refreshExpiresIn: number;
  token: string;
}
export type SaveKeysInput = {
  privateKey: string;
  publicKey: string;
  service: string;
}
export type SaveKeysOutput = {
  success: boolean
}
export type SyncPrivateKeyInput = {
  service: string;
}
export type SyncPrivateKeyOutput = {
  success: boolean;
  privateKey: string;
}

export type Token = string;

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;