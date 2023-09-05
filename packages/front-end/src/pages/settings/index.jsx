import React from 'react';
import SettingListWithTitle from './components/SettingListWithTitle';

const parameters = [
  {
    title: 'Paramètres du compte',
    settingList: [
      {
        title: 'Profil',
        path: 'profile',
      },
    ],
  },
  {
    title: "Paramètres de l'application",
    settingList: [
      {
        title: 'Style',
        path: 'style',
      },
    ],
  },
];

export default function Settings() {
  return <SettingListWithTitle parameters={parameters} />;
}
