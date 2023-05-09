import React from "react"
import renderContent from "../utils/contentful-render"
import useIndexQuery from "../queries/index"
import building from "../images/building.svg"
import down from "../images/down.svg"
import { Link } from "gatsby"
import "../styles/header.scss"

export default function Header({ isDescription, hideCity }) {
  const { contentfulLandingPage } = useIndexQuery()
  return (
    <div className="header">
      <div className="title-links">
        <Link className="title" to="/">
          <h1>{contentfulLandingPage.openingTitle}</h1>
          <img src={building} />
        </Link>
        <div className="links">
          {hideCity ? (
            <Link to="/">
              <img src={down} />
              Home
            </Link>
          ) : (
            <>
              <Link to="#san-francisco">
                <img src={down} />
                San Francisco
              </Link>
              <Link to="#oakland">
                <img src={down} />
                Oakland
              </Link>
            </>
          )}
          <Link to="/about">
            <img src={down} />
            About
          </Link>
          <Link to="/methods">
            <img src={down} />
            Methods
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
