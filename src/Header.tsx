import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { DELAY } from './constants';


const DURATION = 1000;

const text = ['Todo', 'List'];

const LetterTimingConfig = { duration: DURATION }
const LineTimingConfig = { duration: DURATION, easing: Easing.in(Easing.bezierFn(0.25, 0.1, 0.25, 1)) }

const Header = () => {
  const titleFullWidth = useRef(200);
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);

  const lineWidth = useSharedValue(0);

  useEffect(() => {
    opacity1.value = withDelay(0 * DELAY.HEADER, withTiming(1, LetterTimingConfig));
    opacity2.value = withDelay(1 * DELAY.HEADER, withTiming(1, LetterTimingConfig));
    lineWidth.value = withDelay(1.5 * DELAY.HEADER, withTiming(titleFullWidth.current, LineTimingConfig));
  }, []);

  function reloadAnim() {
    opacity1.value = 0;
    opacity2.value = 0;
    lineWidth.value = 0;
    opacity1.value = withDelay(1 * DELAY.HEADER, withTiming(1, LetterTimingConfig));
    opacity2.value = withDelay(2 * DELAY.HEADER, withTiming(1, LetterTimingConfig));
    lineWidth.value = withDelay(3 * DELAY.HEADER, withTiming(titleFullWidth.current, LineTimingConfig));
  }

  return (
    <TouchableOpacity onPress={reloadAnim}>
      <View style={styles.header}>
        <View
          style={{ flexDirection: 'row' }}
        >
          <Animated.Text style={{ ...styles.label, opacity: opacity1 }}>{text[0]}</Animated.Text>
          <Animated.Text style={{ ...styles.label, opacity: opacity2 }}>{text[1]}</Animated.Text>
        </View>
        <Animated.View style={{ ...styles.line, width: lineWidth }} />
      </View>
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 36,
    fontFamily: 'AmericanTypewriter-Bold',
    marginRight: 8,
  },
  line: {
    height: 1,
    // flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
});
