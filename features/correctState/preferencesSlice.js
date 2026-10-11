import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTrack: 'All',
  showSavedOnly: false,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    trackSelected(state, action) {
      state.selectedTrack = action.payload;
    },
    savedOnlyToggled(state) {
      state.showSavedOnly = !state.showSavedOnly;
    },
  },
});

export const { trackSelected, savedOnlyToggled } = preferencesSlice.actions;
export default preferencesSlice.reducer;
