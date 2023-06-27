import React from 'react'
import phone from '../images/phone.png'
import playlist from '../images/playlist.png'
import bid from '../images/bid.png'

export default function Technology() {
  return (
    <div className="technology" id="technology-section">
      <div>
        <div className='subtitleTechnology'>Customer's oriented</div>
        <div className='titleTechnology'>Technologies</div>
      </div>

      <div className='technologyCards'>
        <div className='technologyCard'>
          <img src={phone} className='technologyImg'></img>
          <div className='technologyCardTitle'>Mobile App</div>
          <div className='technologyCardText'>To make the technology more accessible, we chose to create a Mobile App interface, simple and efficient.</div>
        </div>

        <div className='technologyCard'>
          <img src={playlist} className='technologyImg'></img>
          <div className='technologyCardTitle'>Playlist Maker</div>
          <div className='technologyCardText'>We offer you the opportunity to chose your favorite music at any time</div>
        </div>

        <div className='technologyCard'>
          <img src={bid} className='technologyImg'></img>
          <div className='technologyCardTitle'>Auction function</div>
          <div className='technologyCardText'>We create a challenging auction function to permit the selection of the music.</div>
        </div>
         
      </div>

      <div className='technologyCards'>
        <div className='technologyCard'>
          <img src={phone} className='technologyImg'></img>
          <div className='technologyCardTitle'>Mobile App</div>
          <div className='technologyCardText'>To make the technology more accessible, we chose to create a Mobile App interface, simple and efficient.</div>
        </div>

        <div className='technologyCard'>
          <img src={playlist} className='technologyImg'></img>
          <div className='technologyCardTitle'>Playlist Maker</div>
          <div className='technologyCardText'>We offer you the opportunity to chose your favorite music at any time</div>
        </div>

        <div className='technologyCard'>
          <img src={bid} className='technologyImg'></img>
          <div className='technologyCardTitle'>Auction function</div>
          <div className='technologyCardText'>We create a challenging auction function to permit the selection of the music.</div>
        </div>
         
      </div>

    </div>
  )
}
