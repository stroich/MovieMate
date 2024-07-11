import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import '@react-navigation/native';
import Dropdown from './Dropdown';

const listOfOption = [
  {id: '1', value: 'Action'},
  {id: '2', value: 'Adventure'},
  {id: '3', value: 'Fantasy'},
];

describe('renders Dropdown', () => {
  it('should render Dropdown with select options', () => {
    const {getByText} = render(
      <Dropdown data={listOfOption} value="" onChange={() => {}} />,
    );
    const selected = getByText('Select options');
    expect(selected).toBeTruthy();
  });

  it('should render Dropdown with Action', () => {
    const {getByText} = render(
      <Dropdown data={listOfOption} value="Action" onChange={() => {}} />,
    );
    const selected = getByText('Action');
    expect(selected).toBeTruthy();
  });

  it('should open the dropdown when pressed', () => {
    const {getByText} = render(
      <Dropdown data={listOfOption} value="" onChange={() => {}} />,
    );

    const selected = getByText('Select options');
    fireEvent.press(selected);

    expect(getByText('Action')).toBeTruthy();
    expect(getByText('Adventure')).toBeTruthy();
    expect(getByText('Fantasy')).toBeTruthy();
  });

  it('should select an option when pressed', () => {
    const {getByText, queryByText} = render(
      <Dropdown data={listOfOption} value="" onChange={() => {}} />,
    );

    const selected = getByText('Select options');
    fireEvent.press(selected);

    const fantasyOption = getByText('Fantasy');
    fireEvent.press(fantasyOption);

    expect(getByText('Fantasy')).toBeTruthy();
    expect(queryByText('Action')).toBeFalsy();
    expect(queryByText('Adventure')).toBeFalsy();
  });

  it('should select an option when textinput is submited', () => {
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

  it('should change style with the empty list', () => {
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
