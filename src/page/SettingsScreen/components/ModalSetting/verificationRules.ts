import {RegisterOptions} from 'react-hook-form';

import {PersonalSettingsType} from '@type/settingType';

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
  Movie = 'Movie',
  Series = 'Series',
  Episode = 'Episode',
}

const rulesForPreferences: RulesType = {
  required: 'This field is required',
  validate: value =>
    Object.keys(VideoType).includes(value) ||
    'Valid types are: Movie, Series, Episode.',
};

export const verificationRules = {
  Username: rulesForUsername,
  Email: rulesForEmail,
  Preferences: rulesForPreferences,
};
