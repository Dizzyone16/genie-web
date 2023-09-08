import React from 'react'
import commaNumber from 'comma-number'
import RatingInfo from './RatingInfo'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  // Define the constants here
  const PAGE_MAX_WIDTH = 480
  const IMAGE_WIDTH = 130
  const MARGIN_SIDE = 20
  const PADDING_BETWEEN = 20

  // Calculate max-width dynamically
  const itemTitleMaxWidth =
    PAGE_MAX_WIDTH - IMAGE_WIDTH - PADDING_BETWEEN - MARGIN_SIDE * 2

  const handleNavigation = () => {
    navigate(`/catalog/${product?.catalogNumber}`)
  }

  return (
    <div style={{ backgroundColor: 'white', paddingBottom: '25px' }}>
      <button
        onClick={handleNavigation}
        style={{ backgroundColor: 'white', width: '100%', border: 'none' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* Product Image */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '130px',
              height: '130px',
            }}
          >
            <img
              src={decodeURIComponent(product?.imageUrl)}
              alt={product?.title}
              style={{
                width: '100%',
                height: '100%',
                border: '1px solid #D9D9D9',
                borderRadius: '16px',
              }}
            />
          </div>
          {/* Product Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: '20px',
            }}
          >
            {/* Badge for lowest price per option */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#F2F2F2',
                alignItems: 'center',
                alignSelf: 'flex-start',
                padding: '3px',
                paddingLeft: '5px',
                paddingRight: '5px',
                borderRadius: '5px',
                marginBottom: '5px',
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#757575',
                }}
              >
                동일상품 최저가
              </p>
            </div>
            <p
              style={{
                fontSize: '16px',
                color: 'black',
                maxWidth: itemTitleMaxWidth,
              }}
            >
              {product?.title}
            </p>
            <div
              style={{
                marginTop: '7px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <p style={{ fontSize: '14px', color: '#EA3323' }}>최저가&nbsp;</p>
              <p
                style={{
                  fontSize: '15px',
                  color: '#EA3323',
                  fontWeight: 'bold',
                }}
              >
                {commaNumber(product?.lowestPrice)}
              </p>
              <p style={{ fontSize: '14px', color: '#EA3323' }}>원</p>
              <p style={{ fontSize: '12px', color: 'gray' }}>
                &nbsp;배송비 포함
              </p>
            </div>
            {/* Rating Score & Count */}
            <RatingInfo
              ratingScore={product?.ratingScore}
              ratingCount={product?.ratingCount}
              style={{ marginTop: '6px' }}
            />
            {product?.sellerCount > 0 && (
              <div style={{ marginTop: '4px', textAlign: 'left' }}>
                <p style={{ fontSize: '14px', color: 'black' }}>
                  판매처 {commaNumber(product?.sellerCount)}
                </p>
              </div>
            )}
          </div>
        </div>
      </button>
    </div>
  )
}

export default ProductCard
