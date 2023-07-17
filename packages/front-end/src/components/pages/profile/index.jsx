import React from 'react';
import './style/profile.css';

export default function Profile() {
  return (
    <div className='profile'>
        <div className='ligne1'>profil
            <div className='col1'>test
                <div className='topSquare'>test</div>
                <div className='bottomSquare'>test</div>
            </div>

            <div className='col2'>

            </div>
        </div>

        <div className='ligne2'>
            <div className='col1'></div>
            <div className='col2'></div>
            <div className='col3'>
                <div className='subline1'>
                    <div className='leftSquare'></div>
                    <div className='rightSquare'></div>
                </div>
                <div className='subline2'>
                    <div className='leftSquare'></div>
                    <div className='rightSquare'></div>
                </div>
            </div>
        </div>
    </div>
  );
}
