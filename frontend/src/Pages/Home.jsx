import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import NewCollection from '../Components/NewCollections/NewArrival'
import Offers from '../Components/Offers/Offers'
import About from './About'
import Contact from './Contact'


const Home = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollection />
      <About />
      <Contact />
    </div>
  )
}

export default Home
