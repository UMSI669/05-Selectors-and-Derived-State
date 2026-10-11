import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { eventSaveToggled as flawedToggle } from '../features/duplicatedState/duplicatedSlice';
import { selectIsEventSaved as selectFlawedIsSaved } from '../features/duplicatedState/duplicatedSelectors';
import { eventSaveToggled as correctToggle } from '../features/correctState/savedEventsSlice';
import { selectIsEventSaved as selectCorrectIsSaved } from '../features/correctState/selectors';
import { styles } from '../styles';

export default function EventCard({ event, implementation }) {
  const dispatch = useDispatch();
  const isSaved = useSelector((state) => implementation === 'duplicated'
    ? selectFlawedIsSaved(state, event.id)
    : selectCorrectIsSaved(state, event.id));

  function toggleSaved() {
    dispatch(implementation === 'duplicated' ? flawedToggle(event.id) : correctToggle(event.id));
  }

  return (
    <View style={styles.eventCard}>
      <View style={styles.eventTopRow}>
        <View style={styles.timePill}><Text style={styles.timeText}>{event.time}</Text></View>
        <Text style={styles.trackTag}>{event.track.toUpperCase()}</Text>
      </View>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <View style={styles.eventMetaRow}>
        <Text style={styles.eventMeta}>{event.speaker}</Text>
        <Text style={styles.metaDot}>·</Text>
        <Text style={styles.eventMeta}>{event.duration}</Text>
      </View>
      <Pressable
        onPress={toggleSaved}
        accessibilityRole="button"
        accessibilityLabel={`${isSaved ? 'Unsave' : 'Save'} ${event.title}`}
        style={[styles.saveButton, isSaved && styles.saveButtonSaved]}
      >
        <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextSaved]}>
          {isSaved ? '✓  Saved · Remove' : '+  Save event'}
        </Text>
      </Pressable>
    </View>
  );
}
