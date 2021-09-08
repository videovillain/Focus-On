import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 10;
const DEFAULT_PROGRESS = 1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onEnd = () => {
    vibrate(5000);
    setTimeout(() => {
      setMinutes(DEFAULT_TIME);
      setProgress(DEFAULT_PROGRESS);
      setIsStarted(false);
      onTimerEnd();
    }, 5000);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(DEFAULT_PROGRESS);
    setIsStarted(false);
  };

  const vibrate = (sec) => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), sec / 10);
      setTimeout(() => clearInterval(interval), sec);
    }

    if (Platform.OS === 'android') {
      Vibration.vibrate(sec);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressWrapper}>
        <ProgressBar
          progress={progress}
          color={colors.darkblue}
          style={styles.progressBar}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title='pause' onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title='start' onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title='X' size={40} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    paddingTop: spacing.md,
  },
  title: {
    textAlign: 'center',
    fontSize: fontSizes.lg,
    color: colors.white,
  },
  task: {
    textAlign: 'center',
    fontSize: fontSizes.md,
    color: colors.white,
  },
  buttonWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressWrapper: {
    paddingTop: spacing.sm,
  },
  progressBar: {
    height: spacing.lg,
  },
  clearSubject: {
    // paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
  },
});
