import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles';

function InspectorPanel({ title, subtitle, value, kind }) {
  return (
    <View style={[styles.inspectorPanel, kind === 'derived' && styles.derivedPanel]}>
      <View style={styles.inspectorPanelHeading}>
        <View style={[styles.panelMarker, kind === 'derived' && styles.derivedMarker]}>
          <Text style={styles.panelMarkerText}>{kind === 'stored' ? 'S' : 'ƒ'}</Text>
        </View>
        <View style={styles.panelHeadingCopy}>
          <Text style={styles.panelTitle}>{title}</Text>
          <Text style={styles.panelSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Text selectable style={styles.inspectorJson}>{JSON.stringify(value, null, 2)}</Text>
    </View>
  );
}

export default function StateInspector({ storedState, derivedViewModel }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.inspectorCard}>
      <Pressable onPress={() => setExpanded((value) => !value)} style={styles.inspectorHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>COMPARE THE TWO</Text>
          <Text style={styles.inspectorTitle}>State inspector</Text>
        </View>
        <Text style={styles.inspectorToggle}>{expanded ? 'Collapse  −' : 'Expand  +'}</Text>
      </Pressable>
      {expanded ? (
        <View style={styles.inspectorPanels}>
          <InspectorPanel
            kind="stored"
            title="Stored state"
            subtitle="Values the store actually owns"
            value={storedState}
          />
          <InspectorPanel
            kind="derived"
            title="Derived view model"
            subtitle="Values selectors calculate for display"
            value={derivedViewModel}
          />
        </View>
      ) : null}
    </View>
  );
}
