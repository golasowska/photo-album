import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();

export function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(reduxThunk, routerMiddleware(history)))
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
