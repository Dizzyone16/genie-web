import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import backendApi from '../utils/backendApi'
import RatingInfo from '../components/RatingInfo'
import commaNumber from 'comma-number'

// store
import SearchStore from '../stores/SearchStore'

// component
import Header from '../components/tab/Header'
import LoadingIndicator from '../components/LoadingIndicator'
import { observer } from 'mobx-react'
import AuthStore from '../stores/AuthStore'
import queryString from 'query-string'

// image
const ArrowForward = require('../images/ArrowForward.png')
const NaverShopping = require('../images/NaverIcon.png')

const Divider = () => (
  <div style={{ height: '18px', backgroundColor: '#F5F5F5' }} />
)

const ProductDetailScreen = observer(() => {
  const location = useLocation()
  const maxWidth = 480
  const screenWidth =
    window?.innerWidth >= maxWidth ? maxWidth : window?.innerWidth
  const [catalogNumber, setCatalogNumber] = useState('')
  const [productDetailData, setProductDetailData] = useState({})

  useEffect(() => {
    const initializeData = async () => {
      try {
        SearchStore?.setIsLoading(true)

        if (!AuthStore?.isTokenInitialized) {
          await AuthStore?.loadToken()
        }

        if (location.search) {
          const parsed = queryString.parse(location.search)
          const productNumber = parsed?.productNumber
          console.log('productNumber', productNumber)
          const result = await backendApi?.getProductDetailData(productNumber)

          if (result?.status === 200) {
            if (result?.data) {
              setProductDetailData(result?.data)
            }
          }
          setCatalogNumber(productNumber)

          SearchStore?.setIsLoading(false)
          backendApi.logEvent('catalog_click', { catalogNumber: productNumber })
        }
      } catch (err) {
        console.log(err)
      }
    }
    initializeData()
  }, [location.search])

  const handleOptionClick = (option) => async () => {
    try {
      SearchStore?.setIsLoading(true)

      const result = await backendApi?.getProductOptionData(
        catalogNumber,
        option?.optionNumber
      )
      setProductDetailData({
        ...productDetailData,
        title: result?.data?.title,
        lowestPrice: result?.data?.mallList[0]?.price,
        originalPrice: result?.data?.originalPrice,
        mallList: result?.data?.mallList,
        lowestPriceUrl: result?.data?.mallList[0]?.mallUrl,
      })
    } catch (err) {
      console.error(err)
    } finally {
      SearchStore?.setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        minHeight: '100vh',
        paddingTop: 55,
        paddingBottom: 64,
      }}
    >
      <Header />

      {SearchStore?.isLoading && <LoadingIndicator />}

      {Object.keys(productDetailData).length > 0 && (
        <>
          {/* Product Image */}
          <div style={{ textAlign: 'center' }}>
            <img
              src={decodeURIComponent(productDetailData?.imageUrl)}
              style={{ width: screenWidth, height: screenWidth }}
              alt='Product'
            />
          </div>

          {/* Product Info */}
          <div style={{ padding: '25px' }}>
            <div>
              <p
                style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}
              >
                {productDetailData?.title}
              </p>
            </div>

            {/* Rating Info Placeholder */}
            <RatingInfo
              ratingScore={productDetailData?.ratingScore}
              ratingCount={productDetailData?.ratingCount}
              style={{ marginTop: 8 }}
            />

            {/* Price Info */}
            <div
              style={{
                marginTop: '14px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {/* Price Information */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '20px', color: '#EA3323' }}>
                    최저가&nbsp;
                  </span>
                  <span
                    style={{
                      fontSize: '22px',
                      color: '#EA3323',
                      fontWeight: 'bold',
                    }}
                  >
                    {commaNumber(productDetailData?.lowestPrice)}
                  </span>
                  <span style={{ fontSize: '20px', color: '#EA3323' }}>
                    원{' '}
                  </span>
                </div>

                {productDetailData?.originalPrice && (
                  <div style={{ marginTop: '8px' }}>
                    <span
                      style={{
                        fontSize: '16px',
                        textDecoration: 'line-through',
                      }}
                    >
                      {commaNumber(productDetailData?.originalPrice)}원
                    </span>
                  </div>
                )}

                <div style={{ marginTop: '4px' }}>
                  <span style={{ fontSize: '14px' }}>배송비 포함</span>
                </div>
              </div>
            </div>
          </div>

          {/* 더 많은 옵션 보기 */}
          {productDetailData?.options && (
            <>
              <Divider />

              <div
                style={{
                  marginTop: '32px',
                  paddingLeft: '25px',
                  marginBottom: '32px',
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <h2
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    더 많은 옵션 보기
                  </h2>
                </div>

                <div
                  style={{
                    display: 'flex',
                    overflowX: 'auto',
                  }}
                >
                  {productDetailData?.options?.map((option, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px',
                          borderRadius: '16px',
                          marginRight: '25px',
                          backgroundColor: '#F3F4F6',
                          cursor: 'pointer',
                        }}
                        onClick={handleOptionClick(option)}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: '14px',
                              color: 'black',
                              fontWeight: 'bold',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {commaNumber(option?.quantity)}
                          </p>
                        </div>
                        <div style={{ marginTop: '8px' }}>
                          <p
                            style={{
                              fontSize: '16px',
                              fontWeight: 'bold',
                              color: '#EA3323',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {commaNumber(option?.price)}
                          </p>
                        </div>
                        {option?.unitPrice && (
                          <div style={{ marginTop: '8px' }}>
                            <p
                              style={{
                                fontSize: '14px',
                                color: 'black',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {option?.unitPrice}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}

          <Divider />

          <div
            style={{
              marginTop: '32px',
              paddingLeft: '25px',
              paddingRight: '25px',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}
              >
                판매처
              </span>
            </div>

            {productDetailData?.mallList?.map((mall, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '60px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.open(mall?.mallUrl, '_blank')
                    backendApi?.logEvent('mallSelect', {
                      productName: productDetailData?.title,
                      mallName: mall?.sellerName,
                      url: mall?.mallUrl,
                    })
                  }}
                >
                  <div>
                    <span style={{ fontSize: '18px', color: 'black' }}>
                      {mall?.sellerName}
                    </span>
                  </div>

                  <div style={{ display: 'flex' }}>
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: index === 0 ? '#EA3323' : 'black',
                      }}
                    >
                      {commaNumber(mall?.price)}
                    </span>

                    <span
                      style={{
                        fontSize: '16px',
                        color: index === 0 ? '#EA3323' : 'black',
                      }}
                    >
                      원{' '}
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 8,
                      }}
                    >
                      <img
                        src={ArrowForward}
                        style={{ height: 12, width: 8 }}
                        alt='Arrow Forward Icon'
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div
            style={{
              width: screenWidth - 40,
              position: 'fixed',
              bottom: '0',
              paddingLeft: 20,
              paddingRight: 20,
              height: 64,
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 999,
            }}
          >
            <div style={{ flex: 1 }}>
              <button
                onClick={() => {
                  window.open(productDetailData?.lowestPriceUrl, '_blank')
                  backendApi?.logEvent('mallSelect', {
                    productName: productDetailData?.title,
                    mallName: productDetailData?.mallList[0]?.sellerName,
                    url: productDetailData?.mallList[0]?.mallUrl,
                  })
                }}
                style={{
                  width: screenWidth - 40,
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#4880EE',
                  borderRadius: '16px',
                  border: 'none',
                }}
              >
                <span style={{ color: 'white', fontSize: '18px' }}>
                  구매하기
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
})

export default ProductDetailScreen
