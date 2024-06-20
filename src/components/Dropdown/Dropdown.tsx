import React, {useContext, useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../ThemeProvider/ThemeProvider';
import ThemedText from '../ThemedText/ThemedText';
import AntDesign from 'react-native-vector-icons/AntDesign';

type ItemType = {
  id: string;
  value: string;
};

type DropdownProps = {
  data: Array<ItemType>;
  onChange: (value: string) => void;
  value: string;
};

function Dropdown({data, onChange, value}: DropdownProps) {
  const initialSelected = value ? value : 'Select options';
  const [selected, setSelected] = useState(initialSelected);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const {colors} = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState('');
  const [sortedData, setSortedData] = useState(data);

  const onPressSelected = () => {
    setIsOpenOptions(prevState => !prevState);
    setInputValue('');
    setSortedData(data);
  };

  const handlePressSelected = (item: ItemType) => {
    setSelected(item.value);
    onChange(item.value);
    setIsOpenOptions(prevState => !prevState);
    setInputValue('');
    setSortedData(data);
  };

  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const newText = event.nativeEvent.text;
    setInputValue(newText);
    if (inputValue) {
      setSortedData(() => {
        const newData = data.filter(el => el.value.startsWith(newText));

        return newData;
      });
    } else {
      setSortedData(() => data.filter(el => el.value.startsWith(newText)));
    }
  };

  const handleSubmit = () => {
    onChange(inputValue);
  };

  return (
    <View style={styles.containerDropdown}>
      {!isOpenOptions && (
        <TouchableOpacity
          onPress={onPressSelected}
          style={[styles.containerInput, {backgroundColor: colors.colorInput}]}>
          <ThemedText style={styles.text}>{selected}</ThemedText>
          <TouchableOpacity onPress={onPressSelected}>
            <AntDesign name="down" size={20} color={colors.colorText} />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      {isOpenOptions && (
        <View style={styles.container}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.beforeButton}>
              <AntDesign name="search1" size={15} color={colors.colorText} />
            </TouchableOpacity>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: colors.colorInput, color: colors.colorText},
              ]}
              value={inputValue}
              onChange={handleChange}
              placeholder="Search"
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity style={styles.button} onPress={onPressSelected}>
              <AntDesign name="close" size={20} color={colors.colorText} />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={[
              styles.containerList,
              {borderWidth: sortedData.length ? 1 : 0},
            ]}
            style={styles.list}
            data={sortedData}
            renderItem={({item}) => (
              <TouchableHighlight onPress={() => handlePressSelected(item)}>
                <ThemedText style={styles.text}>{item.value}</ThemedText>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerDropdown: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: '100%',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#606265',
  },
  input: {
    height: 40,
    width: '100%',
    paddingLeft: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#606265',
  },
  beforeButton: {
    position: 'absolute',
    justifyContent: 'center',
    left: 15,
    height: '100%',
  },
  button: {
    position: 'absolute',
    justifyContent: 'center',
    right: 15,
    height: '100%',
  },
  containerList: {
    marginTop: 5,
    width: '100%',
    paddingLeft: 20,
    borderRadius: 20,
    borderColor: '#606265',
  },
  list: {
    width: '100%',
  },
  text: {
    padding: 10,
    fontSize: 15,
  },
});

export default Dropdown;
