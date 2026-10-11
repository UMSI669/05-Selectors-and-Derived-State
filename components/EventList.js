import React from 'react';
import { Text, View } from 'react-native';
import EventCard from './EventCard';
import { styles } from '../styles';

export default function EventList({ events, implementation }) {
  return (
    <View style={styles.listSection}>
      <View style={styles.listHeading}>
        <View>
          <Text style={styles.sectionEyebrow}>CONFERENCE SESSIONS</Text>
          <Text style={styles.sectionTitle}>Events</Text>
        </View>
        <Text style={styles.resultCount}>{events.length} visible</Text>
      </View>
      {events.length ? events.map((event) => (
        <EventCard key={event.id} event={event} implementation={implementation} />
      )) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No events match these filters</Text>
          <Text style={styles.emptyCopy}>Change the track or turn off “Show saved events only”.</Text>
        </View>
      )}
    </View>
  );
}
