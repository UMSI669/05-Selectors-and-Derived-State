import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import DemoTabs from './components/DemoTabs';
import DuplicatedStateDemo from './features/duplicatedState/DuplicatedStateDemo';
import { createDuplicatedStore } from './features/duplicatedState/duplicatedStore';
import { createCorrectStore } from './app/store';
import CorrectStateDemo from './features/correctState/CorrectStateDemo';
import { styles } from './styles';

export default function App() {
  const [implementation, setImplementation] = useState('correct');
  const [duplicatedStore] = useState(createDuplicatedStore);
  const [correctStore] = useState(createCorrectStore);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>STATE DESIGN LAB · SOURCE VS DERIVED</Text>
          <Text style={styles.heroTitle}>Save a conference event</Text>
          <Text style={styles.heroCopy}>
            Compare duplicated state with a minimal source of truth. Toggle implementations and inspect what is stored versus calculated.
          </Text>
        </View>

        <DemoTabs activeTab={implementation} onChange={setImplementation} />

        {implementation === 'duplicated' ? (
          <Provider store={duplicatedStore}>
            <DuplicatedStateDemo />
          </Provider>
        ) : (
          <Provider store={correctStore}>
            <CorrectStateDemo />
          </Provider>
        )}

        <View style={styles.teachingCard}>
          <Text style={styles.sectionEyebrow}>SOURCE OF TRUTH CHECK</Text>
          <Text style={styles.teachingTitle}>Can this value be calculated from other state?</Text>
          <Text style={styles.teachingCopy}>
            Store event IDs and preferences. Calculate the saved count, saved status, filtered lists,
            and summary when the UI needs them. Fewer independently editable values mean fewer ways
            for the interface to disagree with itself.
          </Text>
          <View style={styles.conceptRow}>
            <View style={styles.conceptCard}>
              <Text style={styles.conceptLabel}>STORE</Text>
              <Text style={styles.conceptText}>Inputs that actions change.</Text>
            </View>
            <View style={styles.conceptCard}>
              <Text style={styles.conceptLabel}>SELECT</Text>
              <Text style={styles.conceptText}>Values calculated from those inputs.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
