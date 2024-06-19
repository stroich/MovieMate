import React from 'react';
import {ReactNode, useContext} from 'react';
import {ThemeContext} from '../ThemeProvider/ThemeProvider';
import {StyleSheet, Text, TextStyle} from 'react-native';

type ThemedTextProps = {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
};

function ThemedText({children, style}: ThemedTextProps) {
  const {colors} = useContext(ThemeContext);

  return (
    <Text style={[styles.text, {color: colors.colorText}, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default ThemedText;
