import { configureStore } from '@reduxjs/toolkit';
import duplicatedReducer from './duplicatedSlice';

export function createDuplicatedStore() {
  return configureStore({ reducer: duplicatedReducer });
}
