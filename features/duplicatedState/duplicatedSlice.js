import { createSlice } from '@reduxjs/toolkit';
import { events } from '../../data/events';

export const initialDuplicatedState = {
  ids: [],
  count: 0,
  visibleEvents: events,
  selectedTrack: 'All',
  showSavedOnly: false,
};

function calculateAndStoreVisibleEvents(state) {
  const trackEvents = events.filter((event) => (
    state.selectedTrack === 'All' || event.track === state.selectedTrack
  ));
  state.visibleEvents = state.showSavedOnly
    ? trackEvents.filter((event) => state.ids.includes(event.id))
    : trackEvents;
}

const duplicatedSlice = createSlice({
  name: 'duplicatedState',
  initialState: initialDuplicatedState,
  reducers: {
    eventSaveToggled(state, action) {
      const eventId = action.payload;
      if (state.ids.includes(eventId)) {
        state.ids = state.ids.filter((id) => id !== eventId);
      } else {
        state.ids.push(eventId);
      }
      // Teaching bug: ids and visibleEvents update, but the duplicated count is left stale.
      calculateAndStoreVisibleEvents(state);
    },
    trackSelected(state, action) {
      state.selectedTrack = action.payload;
      calculateAndStoreVisibleEvents(state);
    },
    savedOnlyToggled(state) {
      state.showSavedOnly = !state.showSavedOnly;
      calculateAndStoreVisibleEvents(state);
    },
    flawedSavedEventsCleared(state) {
      state.ids = [];
      state.count = 0;
      calculateAndStoreVisibleEvents(state);
    },
  },
});

export const {
  eventSaveToggled,
  trackSelected,
  savedOnlyToggled,
  flawedSavedEventsCleared,
} = duplicatedSlice.actions;

export default duplicatedSlice.reducer;
