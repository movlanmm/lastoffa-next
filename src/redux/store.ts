import { configureStore, combineReducers } from '@reduxjs/toolkit'
import  showCartMenu from './lib/showCartMenu'
import userInfo from "./lib/userInfo"
import cartData from './lib/cartSlice'
import { persistStore, persistReducer } from 'redux-persist'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import wishlistData from './lib/wishlistSlice'
import productsData from './lib/productsSlice'
import shippingData from './lib/shippingSlice'
import orderData from './lib/orderList'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import  loadingData  from './lib/loading'
import  adminData from './lib/adminSlice'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  showCartMenu,
  userInfo,
  cartData,
  wishlistData,
  productsData,
  shippingData,
  orderData,
  loadingData,
  adminData
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;