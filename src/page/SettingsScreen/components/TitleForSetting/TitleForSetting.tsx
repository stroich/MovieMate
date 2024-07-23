import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import ThemedText from '../../../../components/ThemedText/ThemedText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSnapshot} from 'valtio';
import themeState from '../../../../store/GlobalStores/themeState';

type ThemedTextProps = {
  value: string;
  isEdit?: boolean;
  onPressEdit?: () => void;
};

function TitleForSetting({value, isEdit, onPressEdit}: ThemedTextProps) {
  const testId = useMemo(() => value.split(' ').join(''), [value]);
  const {colors} = useSnapshot(themeState);

  return (
    <View style={[styles.containerText, {borderBottomColor: colors.colorText}]}>
      <ThemedText>{value}</ThemedText>
      {isEdit && (
        <TouchableOpacity
          testID={`settingPage-button-${testId}`}
          onPress={onPressEdit}>
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
