import React, {useState} from 'react';
import {TextInput, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

type SearchProps = {
  searchMovies: (value: string) => void;
};

function Search({searchMovies}: SearchProps) {
  const navigation = useNavigation();
  const [queryText, setQueryText] = useState('');
  const insets = useSafeAreaInsets();

  const handleSubmit = async () => {
    searchMovies(queryText);
  };

  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          style={styles.icon}
          name="arrowleft"
          size={24}
          color="white"
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="lightgrey"
        onChangeText={setQueryText}
        value={queryText}
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
    backgroundColor: '#343536CC',
    borderColor: '#606265',
    paddingLeft: 20,
    color: 'white',
  },
});

export default Search;
