import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import '@react-navigation/native';
import Dropdown from './Dropdown';

const listOfOption = [
  {id: '1', value: 'Action'},
  {id: '2', value: 'Adventure'},
  {id: '3', value: 'Fantasy'},
];

describe('Dropdown', () => {
  it('should render with the button "select options"', () => {
    const {getByText} = render(
      <Dropdown data={listOfOption} value="" onChange={() => {}} />,
    );
    getByText('Select options');
  });

  it('should render with the button "Action"', () => {
    const {getByText} = render(
      <Dropdown data={listOfOption} value="Action" onChange={() => {}} />,
    );
    getByText('Action');
  });

  it('should open  dropdown by pressing a button "Select options"', () => {
    const {getByText} = render(
      <Dropdown data={listOfOption} value="" onChange={() => {}} />,
    );

    const selected = getByText('Select options');
    fireEvent.press(selected);

    getByText('Action');
    getByText('Adventure');
    getByText('Fantasy');
  });

  it('should render "Fantasy" option by pressing "Fantasy" button', () => {
    const {getByText, queryByText} = render(
      <Dropdown data={listOfOption} value="" onChange={() => {}} />,
    );

    const selected = getByText('Select options');
    fireEvent.press(selected);

    const fantasyOption = getByText('Fantasy');
    fireEvent.press(fantasyOption);

    expect(queryByText('Fantasy')).toBeTruthy();
    expect(queryByText('Action')).toBeFalsy();
    expect(queryByText('Adventure')).toBeFalsy();
  });

  it('should call onChange function by submitting textinput', () => {
    const mockGOnSearch = jest.fn();
    const {getByText, getByPlaceholderText} = render(
      <Dropdown data={listOfOption} value="" onChange={mockGOnSearch} />,
    );

    const selected = getByText('Select options');
    fireEvent.press(selected);

    const searchInput = getByPlaceholderText('Search');
    fireEvent(searchInput, 'submitEditing', {nativeEvent: {text: 'some text'}});
    expect(mockGOnSearch).toHaveBeenCalled();
  });

  it('should change style for flatlist if options are empty array', () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(
      <Dropdown data={listOfOption} value="" onChange={() => {}} />,
    );

    const selected = getByText('Select options');
    fireEvent.press(selected);
    let flatlist = getByTestId('Settings-Modal-Dropdawn-Flatlist');
    expect(flatlist.props.contentContainerStyle).toMatchObject({
      borderColor: '#606265',
      borderRadius: 20,
      borderWidth: 1,
      marginTop: 5,
      width: '100%',
    });

    const searchInput = getByPlaceholderText('Search');
    fireEvent(searchInput, 'submitEditing', {nativeEvent: {text: 'some text'}});
    flatlist = getByTestId('Settings-Modal-Dropdawn-Flatlist');
    expect(flatlist.props.contentContainerStyle).toMatchObject({
      marginTop: 5,
      width: '100%',
    });
  });
});
