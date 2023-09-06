import React from 'react';
import MyCard from '../../components/MyCard';
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
  return (
    <MyCard>
      <SettingListWithTitle parameters={parameters} />
    </MyCard>
  );
}
