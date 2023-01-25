import React from 'react'
import {GatsbyImage} from 'gatsby-plugin-image'

function EvictorImage(props) {
  return (
    <div className="evictor-image-container">
      <div
        className="evictor-image-column"
        style={{width: `${props.width}px`}}
      >
        <div
          className="photo-wrapper"
          style={{
            width: `${props.width}px`,
            height: `${props.width}px`,
          }}
        >
          <GatsbyImage
            className="background-cover-photo"
            imgClassName="background-cover-photo-image"
            image={props.image}
            alt={props.name}
          />
          <div className="photo-pattern" />
          <div className="photo-filter" />
        </div>
        {!props.hideEyebrow && (
          <>
            {typeof props.rank !== 'undefined' && (
              <div className="eyebrow">{props.rank + 1}</div>
            )}
            {props.name && (
              <div className="caption hover-label text-right">
                {props.name}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default EvictorImage
