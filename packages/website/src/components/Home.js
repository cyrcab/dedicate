import React from 'react'
import music from '../images/music.png'

export default function Home() {
  return (
    <div className="home" id="technology-section">
        <img src={music} styles="max-width:200vw" className="imgHome">
        </img>
        <div className="textHome">
          <div className="subtitleHome">Music / Technology</div>
          <h1 className="titleHome">DEDICATE</h1>
          <div className="textParagraphe">Dedicate is a music streaming platform that allows you to listen to your favorite music for free.</div>
          <div className="btnHome">Get Started</div>
        </div>
    </div>

  )
}
