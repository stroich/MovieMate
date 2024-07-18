import React from 'react';
import {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import ThemedText from '../../../../components/ThemedText/ThemedText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSnapshot} from 'valtio';
import themeState from '../../../../store/GlobalStores/themeState';

type ThemedTextProps = {
  children: ReactNode;
  isEdit?: boolean;
  onPressEdit?: () => void;
};

function TitleForSetting({children, isEdit, onPressEdit}: ThemedTextProps) {
  const {colors} = useSnapshot(themeState);

  return (
    <View style={[styles.containerText, {borderBottomColor: colors.colorText}]}>
      <ThemedText>{children}</ThemedText>
      {isEdit && (
        <TouchableOpacity onPress={onPressEdit}>
          <AntDesign
            testID={'edit'}
            name="edit"
            size={24}
            color={colors.colorText}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerText: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});

export default TitleForSetting;
