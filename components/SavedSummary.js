import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

export default function SavedSummary({ summary, savedCount, actualIdCount, isFlawed }) {
  const hasConflict = isFlawed && savedCount !== actualIdCount;

  return (
    <View style={[styles.summaryCard, hasConflict && styles.summaryCardConflict]}>
      <View style={styles.summaryTopRow}>
        <View>
          <Text style={styles.summaryEyebrow}>{isFlawed ? 'INTENTIONALLY FLAWED SUMMARY' : 'SELECTOR-BASED SUMMARY'}</Text>
          <Text style={styles.summaryTitle}>{summary}</Text>
        </View>
        <View style={[styles.countBadge, hasConflict && styles.countBadgeConflict]}>
          <Text style={styles.countNumber}>{savedCount}</Text>
          <Text style={styles.countLabel}>saved</Text>
        </View>
      </View>
      <View style={styles.countDetail}>
        <Text style={styles.countDetailText}>Count shown: {savedCount}</Text>
        <Text style={styles.countDetailText}>IDs stored: {actualIdCount}</Text>
      </View>
      {hasConflict ? (
        <Text style={styles.conflictMessage}>These values disagree because the flawed save action updated IDs but forgot the stored count.</Text>
      ) : null}
    </View>
  );
}
