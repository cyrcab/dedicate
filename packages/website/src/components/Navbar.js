import React, { useState } from 'react';
import '../styles/global.css';

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="title">DEDICATE</div>
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        ☰
      </div>
      <div className={`links ${isMenuOpen ? 'active' : ''}`}>
        <a className='navLink' href="#technology-section" onClick={closeMenu}>Technology</a>
        <a className='navLink' href="#vision-section" onClick={closeMenu}>Vision</a>
        <a className='navLink' href="#partenaires-section" onClick={closeMenu}>Partenaires</a>
        <a className='navLink' href="#contact-section" onClick={closeMenu}>Contact</a>
        <div className="adminBtn navLink">Déjà Client</div>
      </div>
    </nav>
  );
}
