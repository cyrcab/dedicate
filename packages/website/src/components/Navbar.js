import React from 'react'
import '../styles/global.css'

export default function Navbar() {
  return (
    <nav className="navigation">
        <div className="title">DEDICATE</div>
        <div className="links">
            <a href="#technology-section">Technology</a>
            <a href="#vision-section">Vision</a>
            <a href="#partenaires-section">Partenaires</a>
            <a href="#contact-section">contact</a>
        </div>
        <div className="adminBtn">Déja Client</div>
        
    </nav>

  )
}
