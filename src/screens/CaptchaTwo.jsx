import React from 'react'
import CaptchaComponent from '../components/CaptchaComponent'

const CaptchaTwo = () => {
  return (
    <CaptchaComponent
      captchaImage={'https://avatars.mds.yandex.net/i?id=0957dd5c4a6e6d4336e04dd0bbb92655a31b5331-8566657-images-thumbs&n=13'}
      item={'зебры'}
      correctTiles={[0, 1, 3, 4, 6, 7]}
    />
  )
}

export default CaptchaTwo