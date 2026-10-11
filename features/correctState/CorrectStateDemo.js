import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FilterPanel from '../../components/FilterPanel';
import EventList from '../../components/EventList';
import SavedSummary from '../../components/SavedSummary';
import StateInspector from '../../components/StateInspector';
import { savedOnlyToggled, trackSelected } from './preferencesSlice';
import { savedEventsCleared } from './savedEventsSlice';
import { selectSavedEventIds } from './selectors';
import {
  selectCorrectStoredState,
  selectCorrectViewModel,
  selectSavedCount,
  selectSavedSummary,
  selectSelectedTrack,
  selectShowSavedOnly,
  selectVisibleEvents,
} from './selectors';
import { styles } from '../../styles';

export default function CorrectStateDemo() {
  const dispatch = useDispatch();
  const selectedTrack = useSelector(selectSelectedTrack);
  const showSavedOnly = useSelector(selectShowSavedOnly);
  const visibleEvents = useSelector(selectVisibleEvents);
  const savedCount = useSelector(selectSavedCount);
  const savedIds = useSelector(selectSavedEventIds);
  const summary = useSelector(selectSavedSummary);
  const storedState = useSelector(selectCorrectStoredState);
  const viewModel = useSelector(selectCorrectViewModel);

  return (
    <View style={styles.demoContent}>
      <View style={styles.correctBanner}>
        <Text style={styles.correctTitle}>✓ Minimum source of truth</Text>
        <Text style={styles.correctCopy}>Only saved IDs and preferences are stored. Counts, saved status, filtered lists, and summary are selected.</Text>
      </View>
      <SavedSummary summary={summary} savedCount={savedCount} actualIdCount={savedIds.length} />
      <FilterPanel
        selectedTrack={selectedTrack}
        showSavedOnly={showSavedOnly}
        onTrackChange={(track) => dispatch(trackSelected(track))}
        onSavedOnlyToggle={() => dispatch(savedOnlyToggled())}
      />
      <EventList events={visibleEvents} implementation="correct" />
      {savedIds.length > 0 ? (
        <Text style={styles.clearAction} onPress={() => dispatch(savedEventsCleared())}>
          Clear saved IDs
        </Text>
      ) : null}
      <StateInspector storedState={storedState} derivedViewModel={viewModel} />
    </View>
  );
}
