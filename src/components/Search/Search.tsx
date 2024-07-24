import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSnapshot} from 'valtio';

import themeState from '@store/GlobalStores/themeState';
import constants from '@styles/constants';

type SearchProps = {
  onSearch: (value: string) => void;
};

function Search({onSearch}: SearchProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {colors} = useSnapshot(themeState);

  const handleSubmit = async (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    onSearch(event.nativeEvent.text);
  };

  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      <TouchableOpacity
        testID="SearchPage-backButton"
        onPress={() => navigation.goBack()}>
        <AntDesign
          style={styles.icon}
          name="arrowleft"
          size={24}
          color={colors.colorText}
        />
      </TouchableOpacity>
      <TextInput
        style={[
          styles.input,
          {backgroundColor: colors.colorInput, color: colors.colorText},
        ]}
        placeholder="Search"
        placeholderTextColor={colors.colorGray}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 15,
  },
  input: {
    height: 40,
    width: '80%',
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: constants.colorGray,
    paddingLeft: 20,
  },
});

export default Search;
