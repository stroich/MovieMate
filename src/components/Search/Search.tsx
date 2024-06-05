import React, {useState} from 'react';
import {TextInput, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getMovies} from '../../api/apiMovies';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {ListMoviesType} from '../types/moviesTypes';

type SearchProps = {
  searchMovies: (value: ListMoviesType) => void;
  handleLoading: (value: boolean) => void;
};

function Search({searchMovies, handleLoading}: SearchProps) {
  const navigation = useNavigation();
  const [queryText, setQueryText] = useState('');
  const insets = useSafeAreaInsets();

  const handleSubmit = async () => {
    handleLoading(true);
    const data = await getMovies(queryText);
    searchMovies(data);
    handleLoading(false);
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
    paddingTop: 10,
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
