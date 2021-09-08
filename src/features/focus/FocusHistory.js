import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.history(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <Text style={styles.historyTitle}>Things weve focused on:</Text>
        {!!focusHistory.length && (
          <>
            <FlatList
              contentContainerStyle={styles.flatlist}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title='Clear'
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
  },
  flatlist: {
    flex: 1,
    alignItems: 'center',
  },
  historyTitle: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  history: (status) => ({
    color: status === 1 ? colors.green : colors.red,
    fontSize: fontSizes.lg,
  }),
  clearContainer: {
    alignItems: 'center',
    paddingBottom: spacing.lg,
  },
});
