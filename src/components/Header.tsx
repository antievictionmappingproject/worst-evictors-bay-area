import React from 'react'
import renderContent from '../utils/contentful-render'
import useIndexQuery from '../queries/index'
import building from '../images/building.svg'
import down from '../images/down.svg'
import {Link} from 'gatsby'
import '../styles/header.scss'

export default function Header({isDescription}) {
  const {contentfulLandingPage} = useIndexQuery()
  return (
    <div className="header">
      <div className="title-links">
        <Link className="title" to="/">
          <h1>{contentfulLandingPage.openingTitle}</h1>
          <img src={building} />
        </Link>
        <div className="links">
          <Link to="#san-francisco">
            <img src={down} />
            San Francisco
          </Link>
          <Link to="#oakland">
            <img src={down} />
            Oakland
          </Link>
          <Link to="#resources">
            <img src={down} />
            Resources
          </Link>
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
