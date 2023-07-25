import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './components/styles/index.css';
import store from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>,
);
