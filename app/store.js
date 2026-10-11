import { configureStore } from '@reduxjs/toolkit';
import savedEventsReducer from '../features/correctState/savedEventsSlice';
import preferencesReducer from '../features/correctState/preferencesSlice';

export function createCorrectStore() {
  return configureStore({
    reducer: {
      savedEvents: savedEventsReducer,
      preferences: preferencesReducer,
    },
  });
}
