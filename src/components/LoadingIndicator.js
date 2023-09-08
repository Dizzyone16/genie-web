import { Oval } from 'react-loader-spinner'

const LoadingIndicator = () => {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
      }}
    >
      <Oval
        height={60}
        width={60}
        color='#4880EE'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='transparent'
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  )
}

export default LoadingIndicator
