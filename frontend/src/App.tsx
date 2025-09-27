import React from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import PetGrid from './components/PetGrid'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <Layout>
      <Hero />
      <PetGrid />
      <About />
      <Contact />
    </Layout>
  )
}

export default App