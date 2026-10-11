import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { TRACKS } from '../data/events';
import { styles } from '../styles';

function Choice({ label, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.choice, selected && styles.choiceSelected]}>
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text>
    </Pressable>
  );
}

export default function FilterPanel({ selectedTrack, showSavedOnly, onTrackChange, onSavedOnlyToggle }) {
  return (
    <View style={styles.filterCard}>
      <View style={styles.filterHeading}>
        <View>
          <Text style={styles.sectionEyebrow}>PREFERENCES</Text>
          <Text style={styles.sectionTitle}>Choose what to see</Text>
        </View>
      </View>
      <Text style={styles.filterLabel}>TRACK</Text>
      <View style={styles.choiceRow}>
        {TRACKS.map((track) => (
          <Choice key={track} label={track} selected={selectedTrack === track} onPress={() => onTrackChange(track)} />
        ))}
      </View>
      <Pressable
        onPress={onSavedOnlyToggle}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: showSavedOnly }}
        style={styles.savedToggle}
      >
        <View style={[styles.checkbox, showSavedOnly && styles.checkboxChecked]}>
          {showSavedOnly ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
        <Text style={styles.savedToggleText}>Show saved events only</Text>
      </Pressable>
    </View>
  );
}
