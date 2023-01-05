import React from 'react'
import {Link} from 'gatsby'
import {GatsbyImage} from 'gatsby-plugin-image'

function EvictorImage(props) {
  return (
    <Link
      key={`e-${props.i}`}
      to={`/list#${props.i}`}
      className="evictor-container"
    >
      <div className="container">
        <div className="photo-wrapper">
          <GatsbyImage
            className="background-cover-photo"
            imgClassName="background-cover-photo-image"
            image={props.image}
            aspectRatio={1}
            alt={props.name}
          />
          <div className="photo-pattern" />
          <div className="photo-filter" />
        </div>
        <div className="eyebrow">{props.i + 1}</div>
        <div className="hover-label text-right">{props.name}</div>
      </div>
    </Link>
  )
}

export default EvictorImage
