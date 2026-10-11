import { createSelector } from '@reduxjs/toolkit';
import { events } from '../../data/events';

export const selectSavedEventIds = (state) => state.savedEvents.ids;
export const selectSavedCount = (state) => state.savedEvents.ids.length;
export const selectSelectedTrack = (state) => state.preferences.selectedTrack;
export const selectShowSavedOnly = (state) => state.preferences.showSavedOnly;
export const selectIsEventSaved = (state, eventId) => state.savedEvents.ids.includes(eventId);

export const selectTrackFilteredEvents = createSelector(
  [selectSelectedTrack],
  (selectedTrack) => events.filter((event) => selectedTrack === 'All' || event.track === selectedTrack)
);

export const selectSavedAndFilteredEvents = createSelector(
  [selectTrackFilteredEvents, selectSavedEventIds],
  (trackFilteredEvents, savedIds) => {
    const ids = new Set(savedIds);
    return trackFilteredEvents.filter((event) => ids.has(event.id));
  }
);

export const selectVisibleEvents = createSelector(
  [selectTrackFilteredEvents, selectSavedAndFilteredEvents, selectShowSavedOnly],
  (trackFilteredEvents, savedAndFilteredEvents, showSavedOnly) => (
    showSavedOnly ? savedAndFilteredEvents : trackFilteredEvents
  )
);

export const selectSavedSummary = createSelector(
  [selectSavedCount, selectSelectedTrack, selectSavedAndFilteredEvents, selectVisibleEvents],
  (savedCount, selectedTrack, savedAndFilteredEvents, visibleEvents) => {
    const savedWord = savedCount === 1 ? 'event' : 'events';
    const trackLabel = selectedTrack === 'All' ? 'all tracks' : selectedTrack;
    return `${savedCount} ${savedWord} saved · ${savedAndFilteredEvents.length} match ${trackLabel} · ${visibleEvents.length} visible`;
  }
);

export const selectCorrectStoredState = (state) => state;

export const selectCorrectViewModel = createSelector(
  [
    selectSavedCount,
    selectSavedEventIds,
    selectSelectedTrack,
    selectShowSavedOnly,
    selectTrackFilteredEvents,
    selectSavedAndFilteredEvents,
    selectVisibleEvents,
    selectSavedSummary,
  ],
  (savedCount, savedIds, selectedTrack, showSavedOnly, trackFilteredEvents, savedAndFilteredEvents, visibleEvents, summary) => ({
    savedCount,
    savedStatusById: Object.fromEntries(savedIds.map((id) => [id, true])),
    selectedTrack,
    showSavedOnly,
    trackFilteredEventIds: trackFilteredEvents.map((event) => event.id),
    savedAndFilteredEventIds: savedAndFilteredEvents.map((event) => event.id),
    visibleEventIds: visibleEvents.map((event) => event.id),
    summary,
  })
);
