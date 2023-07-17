/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import './style/Layout.css';

export default function Layout({ children }) {
  const activeTab = 'New events';

  return (
    <div className='layout'>
      <Sidebar />
      <div className='content'>
        <Header activeTab={activeTab} />
        <main>{children}</main>
      </div>
    </div>
  );
}
