import React, {useState} from 'react'
import Intro from '../components/intro'
import Home from '../components/home'
import Layout from '../components/layout'
import '../styles/index.scss'

const HomePage = () => {
  const [isTransitioned, setIsTransitioned] = useState(false)

  return (
    <Layout
      className="layout"
      hideFooter={!isTransitioned}
      hideScrollArrow={!isTransitioned}
      hideNavMenu={!isTransitioned}
    >
      {!isTransitioned && <Intro setIsTransitioned={setIsTransitioned} />}
      <Home />
    </Layout>
  )
}

export default HomePage
