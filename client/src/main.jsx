import React from 'react'
import ReactDOM from 'react-dom/client'
import { SnackbarProvider } from 'notistack';
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
        <App />
      </SnackbarProvider>
  </Provider>
)
