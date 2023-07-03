import React from 'react'
import youtube from '../images/youtube.png'
import insta from '../images/insta.png'
import fb from '../images/fb.png'
import twitter from '../images/twitter.png'
import tiktok from '../images/tiktok.png'
import whatsapp from '../images/whatsapp.png'


export default function Footer() {
  return (
    <div className="footer">
      <div className='footer1'>
        <div className="title">DEDICATE</div>
        <div className="socials">
            <img src={insta} className='networkPic'></img>
            <img src={fb} className='networkPic'></img>
            <img src={twitter} className='networkPic'></img>
            <img src={whatsapp} className='networkPic'></img>
            <img src={tiktok} className='networkPic'></img>
            <img src={youtube} className='networkPic'></img>
        </div>
      </div>

      <div className='footer2'>
        <div className="linksFooter">
              <a href="#technology-section">Technology</a>
              <a href="#vision-section">Vision</a>
              <a href="#partenaires-section">Partenaires</a>
              <a href="#contact-section">Contact</a>
        </div>
        <div className="subtitleFooter">Terms Privacy Policy © 2022 Dedicate, Inc. All rights reserved.</div>
      </div>
    
    </div>
  )
}
