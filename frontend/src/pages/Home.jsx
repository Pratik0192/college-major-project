import React, { useContext } from 'react'
import Hero from '../components/Hero'
import Navigation from '../components/Navigation'
import Hero2 from '../components/Hero2'
import Discover from '../components/Discover'
import Mask from '../components/Mask'
import RecentlyViewed from '../components/RecentlyViewed'

const Home = () => {
  return (
    <div>
      <Navigation />
      <Hero />
      <Discover />
      <RecentlyViewed />
      <Hero2 />
      <Mask />
    </div>
  )
}

export default Home