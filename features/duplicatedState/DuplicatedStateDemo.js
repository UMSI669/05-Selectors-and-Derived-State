import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FilterPanel from '../../components/FilterPanel';
import EventList from '../../components/EventList';
import SavedSummary from '../../components/SavedSummary';
import StateInspector from '../../components/StateInspector';
import {
  savedOnlyToggled,
  trackSelected,
} from './duplicatedSlice';
import {
  flawedSavedEventsCleared,
} from './duplicatedSlice';
import {
  selectDuplicatedCount,
  selectDuplicatedIds,
  selectDuplicatedSelectedTrack,
  selectDuplicatedShowSavedOnly,
  selectDuplicatedSummary,
  selectDuplicatedStoredState,
  selectDuplicatedViewModel,
  selectDuplicatedVisibleEvents,
} from './duplicatedSelectors';
import { styles } from '../../styles';

export default function DuplicatedStateDemo() {
  const dispatch = useDispatch();
  const selectedTrack = useSelector(selectDuplicatedSelectedTrack);
  const showSavedOnly = useSelector(selectDuplicatedShowSavedOnly);
  const visibleEvents = useSelector(selectDuplicatedVisibleEvents);
  const storedCount = useSelector(selectDuplicatedCount);
  const savedIds = useSelector(selectDuplicatedIds);
  const summary = useSelector(selectDuplicatedSummary);
  const storedState = useSelector(selectDuplicatedStoredState);
  const viewModel = useSelector(selectDuplicatedViewModel);

  return (
    <View style={styles.demoContent}>
      <View style={styles.flawedBanner}>
        <Text style={styles.flawedTitle}>⚠ Intentionally flawed implementation</Text>
        <Text style={styles.flawedCopy}>It stores both source values and values that can be derived. Save or unsave an event to reveal the count synchronization bug.</Text>
      </View>
      <SavedSummary summary={summary} savedCount={storedCount} actualIdCount={savedIds.length} isFlawed />
      <FilterPanel
        selectedTrack={selectedTrack}
        showSavedOnly={showSavedOnly}
        onTrackChange={(track) => dispatch(trackSelected(track))}
        onSavedOnlyToggle={() => dispatch(savedOnlyToggled())}
      />
      <EventList events={visibleEvents} implementation="duplicated" />
      {savedIds.length > 0 ? (
        <Text style={styles.clearAction} onPress={() => dispatch(flawedSavedEventsCleared())}>
          Clear saved IDs
        </Text>
      ) : null}
      <StateInspector storedState={storedState} derivedViewModel={viewModel} />
      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>What is duplicated?</Text>
        <Text style={styles.noteText}>The IDs imply a count and, together with preferences and event data, imply the visible list. Storing all of them creates synchronization work.</Text>
      </View>
    </View>
  );
}
