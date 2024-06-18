import {RegisterOptions} from 'react-hook-form';
import {SettingData} from './ModalSetting';

type rulesType = RegisterOptions<SettingData, keyof SettingData>;

export const rulesForUsername: rulesType = {
  required: 'This field is required',
};

export const rulesForEmail: rulesType = {
  required: 'This field is required',
  pattern: {value: /^\S+@\S+$/, message: 'Invalid email address'},
};

export enum VideoType {
  movie,
  series,
  episode,
}

export const rulesForType: rulesType = {
  required: 'This field is required',
  validate: value =>
    Object.values(VideoType).includes(value) ||
    'Valid types are: movie, series, episode.',
};
