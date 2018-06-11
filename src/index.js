import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();