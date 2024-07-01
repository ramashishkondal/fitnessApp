import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer, {RootReducer} from '../Reducers/root';
import {persistReducer} from 'redux-persist';
import {useDispatch, useSelector} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';

export type AppState = ReturnType<RootReducer>;
export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer<AppState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
