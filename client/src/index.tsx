import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';
import { App } from './components/app';
import { syncPrivateKey } from './store/actions';
import './utils/utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(syncPrivateKey({ syncPrivateKeyInput: {
  service: "asdasd1231"
}}));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
