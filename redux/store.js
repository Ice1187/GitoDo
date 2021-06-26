import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistenceConfigs = {
  key: 'root', // whatever you want to keep as your key
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistenceConfigs, rootReducer);

export function initializeStore() {
  return createStore(
    persistedReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
  );
}

export const persistedStore = persistStore(initializeStore());