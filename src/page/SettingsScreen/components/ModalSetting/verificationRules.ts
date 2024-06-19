import {RegisterOptions} from 'react-hook-form';
import {PersonalSettingsType} from '../../../../types/settingType';

type RulesType = RegisterOptions<
  PersonalSettingsType,
  keyof PersonalSettingsType
>;

const rulesForUsername: RulesType = {
  required: 'This field is required',
};

const rulesForEmail: RulesType = {
  required: 'This field is required',
  pattern: {value: /^\S+@\S+$/, message: 'Invalid email address'},
};

export enum VideoType {
  movie,
  series,
  episode,
}

const rulesForPreferences: RulesType = {
  required: 'This field is required',
  validate: value =>
    Object.values(VideoType).includes(value) ||
    'Valid types are: movie, series, episode.',
};

export const verificationRules = {
  Username: rulesForUsername,
  Email: rulesForEmail,
  Preferences: rulesForPreferences,
};
