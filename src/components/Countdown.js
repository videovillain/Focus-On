import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillies = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const [millies, setMillies] = useState(null);

  const countDown = () => {
    setMillies((time) => {
      const timeLeft = time - 1000;

      if (timeLeft === 0) {
        clearInterval(interval.current);
        return timeLeft;
      }

      return timeLeft;
    });
  };

  useEffect(() => {
    onProgress(millies / minutesToMillies(minutes));
    if (millies === 0) {
      onEnd();
    }
  }, [millies]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillies(minutesToMillies(minutes));
  }, [minutes]);

  const min = Math.floor(millies / 1000 / 60) % 60;
  const sec = Math.floor(millies / 1000) % 60;

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(min)}:{formatTime(sec)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: colors.lighterBlue,
  },
});
