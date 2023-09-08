import React from 'react'
import commaNumber from 'comma-number'
import RatingImage from '../images/Rating.png' // Make sure the path is correct

const RatingInfo = ({ ratingScore, ratingCount, style = {} }) => {
  const hasRatingInfo = ratingScore && ratingCount

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}
    >
      {hasRatingInfo && (
        <>
          <div>
            {/* Import and use the image directly */}
            <img
              src={RatingImage}
              alt='Rating'
              style={{ width: '12px', height: 'auto' }}
            />
          </div>
          <p style={{ fontSize: '14px', marginLeft: '2px', color: 'black' }}>
            {ratingScore} ({commaNumber(ratingCount)})
          </p>
        </>
      )}
      {!hasRatingInfo && <div style={style}></div>}
    </div>
  )
}

RatingInfo.defaultProps = {
  style: {},
}

export default RatingInfo
