import React from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type IconProps = {
  name: string;
};

function Icon({name}: IconProps) {
  return (
    <TouchableOpacity>
      <AntDesign name={name} size={24} color="white" />
    </TouchableOpacity>
  );
}

export default Icon;
