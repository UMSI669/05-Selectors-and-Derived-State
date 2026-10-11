import { createSelector } from '@reduxjs/toolkit';
import { events } from '../../data/events';

export const selectDuplicatedStoredState = (state) => state;
export const selectDuplicatedIds = (state) => state.ids;
export const selectDuplicatedCount = (state) => state.count;
export const selectDuplicatedVisibleEvents = (state) => state.visibleEvents;
export const selectDuplicatedSelectedTrack = (state) => state.selectedTrack;
export const selectDuplicatedShowSavedOnly = (state) => state.showSavedOnly;
export const selectIsEventSaved = (state, eventId) => state.ids.includes(eventId);

export const selectDuplicatedSavedAndFilteredEvents = createSelector(
  [selectDuplicatedIds, selectDuplicatedSelectedTrack],
  (ids, selectedTrack) => {
    const savedIds = new Set(ids);
    return events.filter((event) => (
      (selectedTrack === 'All' || event.track === selectedTrack) && savedIds.has(event.id)
    ));
  }
);

export const selectDuplicatedSummary = createSelector(
  [selectDuplicatedCount, selectDuplicatedSelectedTrack, selectDuplicatedVisibleEvents],
  (count, selectedTrack, visibleEvents) => (
    `${count} saved ${count === 1 ? 'event' : 'events'} · ${visibleEvents.length} visible in ${selectedTrack}`
  )
);

export const selectDuplicatedViewModel = createSelector(
  [
    selectDuplicatedCount,
    selectDuplicatedIds,
    selectDuplicatedVisibleEvents,
    selectDuplicatedSavedAndFilteredEvents,
    selectDuplicatedSelectedTrack,
    selectDuplicatedShowSavedOnly,
    selectDuplicatedSummary,
  ],
  (count, ids, visibleEvents, savedAndFilteredEvents, selectedTrack, showSavedOnly, summary) => ({
    displayedSavedCount: count,
    actualSavedIdCount: ids.length,
    selectedTrack,
    showSavedOnly,
    visibleEventIds: visibleEvents.map((event) => event.id),
    savedAndFilteredEventIds: savedAndFilteredEvents.map((event) => event.id),
    summary,
  })
);
