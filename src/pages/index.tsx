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
      <div className="page-container">
        {!isTransitioned && (
          <Intro setIsTransitioned={setIsTransitioned} />
        )}
        <div
          style={{
            gridColumn: '1',
            gridRow: '1',
            maxHeight: isTransitioned ? '' : '100vh',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Home />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
