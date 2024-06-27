import React from 'react';
import {ReactNode} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {useAppSelector} from '../../hooks/useAppDispatch';

type ThemedTextProps = {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
};

function ThemedText({children, style}: ThemedTextProps) {
  const colors = useAppSelector(state => state.theme.color);

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
