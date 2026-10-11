import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles';

export default function DemoTabs({ activeTab, onChange }) {
  const tabs = [
    { id: 'duplicated', label: 'Duplicated state · flawed' },
    { id: 'correct', label: 'Selector-based · correct' },
  ];

  return (
    <View style={styles.tabs} accessibilityRole="tablist">
      {tabs.map((tab) => {
        const selected = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={[styles.tab, selected && styles.tabActive]}
          >
            <Text style={[styles.tabText, selected && styles.tabTextActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
