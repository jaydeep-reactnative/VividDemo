// imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import {persistReducer, persistStore} from 'redux-persist';

// Persist Config
const persistConfig = {
  key: '@weather',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['weather'], // Whitelist (Save Specific Reducers)
  blacklist: [], // Blacklist (Don't Save Specific Reducers)
};

// Combined Reducers
const rootReducer = combineReducers({
  weather: weatherReducer,
});

// Persist config and reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configured store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default {store, persistor};
