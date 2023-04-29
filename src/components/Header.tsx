import React from 'react'
import renderContent from '../utils/contentful-render'
import useIndexQuery from '../queries/index'
import building from '../images/building.svg'
import down from '../images/down.svg'
import '../styles/header.scss'

export default function Header({isDescription}) {
  const {contentfulLandingPage} = useIndexQuery()
  return (
    <div className="header">
      <div className="title-links">
        <div className="title">
          <a href="/">
            <h1>{contentfulLandingPage.openingTitle}</h1>
          </a>
          <img src={building} />
        </div>
        <div className="links">
          <a href="#san-francisco">
            <img src={down} />
            San Francisco
          </a>
          <a href="#oakland">
            <img src={down} />
            Oakland
          </a>
          <a href="#resources">
            <img src={down} />
            Resources
          </a>
        </div>
      </div>
      {isDescription && (
        <div className="description">
          {renderContent(contentfulLandingPage.openingDescription)}
        </div>
      )}
    </div>
  )
}
