import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
};

const savedEventsSlice = createSlice({
  name: 'savedEvents',
  initialState,
  reducers: {
    eventSaveToggled(state, action) {
      const eventId = action.payload;
      if (state.ids.includes(eventId)) {
        state.ids = state.ids.filter((id) => id !== eventId);
      } else {
        state.ids.push(eventId);
      }
    },
    savedEventsCleared(state) {
      state.ids = [];
    },
  },
});

export const { eventSaveToggled, savedEventsCleared } = savedEventsSlice.actions;
export default savedEventsSlice.reducer;
