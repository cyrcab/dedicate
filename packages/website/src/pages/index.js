import React from 'react'
import Navbar from '../components/navbar'
import Technology from '../components/Technology'
import Partenaires from '../components/Partenaires'
import Vision from '../components/Vision'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import Home from '../components/Home'
import '../styles/global.css'

export default function index() {
  return (
    <section>
      <Navbar />
      <Home />
      <Partenaires />
      <Vision />
      <Technology />
      <Contact />
      <Footer />
    </section>
  )
}

