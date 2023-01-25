import React from 'react'
import {GatsbyImage} from 'gatsby-plugin-image'

function EvictorImage(props) {
  return (
    <div className="evictor-image-container">
      <div className="evictor-image-column">
        <div className="photo-wrapper">
          <GatsbyImage
            className="background-cover-photo"
            imgClassName="background-cover-photo-image"
            image={props.image}
            alt={props.name}
          />
          <div className="photo-pattern" />
          <div className="photo-filter" />
        </div>
        <div className="caption">
          {props.rank && (
            <div className="eyebrow">{props.rank + 1}</div>
          )}
          {props.name && (
            <div className="caption hover-label text-right">
              Photo: {props.name}
            </div>
          )}
        </div>{' '}
      </div>
    </div>
  )
}

export default EvictorImage
