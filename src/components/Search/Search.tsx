import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ListMoviesType} from '../ListMovies/ListMovies';
import {getMovies} from '../../api/apiMovies';
// import AntDesign from 'react-native-vector-icons/AntDesign';

type SearchProps = {
  searchMovies: (value: ListMoviesType) => void;
  handleLoading: (value: boolean) => void;
};

function Search({searchMovies, handleLoading}: SearchProps) {
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
      <TouchableOpacity>
        {/* <AntDesign
          style={styles.icon}
          name="arrowleft"
          size={24}
          color="white"
        /> */}
        <Text>Some</Text>
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
