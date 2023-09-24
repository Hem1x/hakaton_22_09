import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './features/mode';

export const rootReducer = {
  mode: modeReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
