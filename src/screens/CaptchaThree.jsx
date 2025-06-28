import React from 'react'
import CaptchaComponent from '../components/CaptchaComponent'

const CaptchaThree = () => {
  return (
    <CaptchaComponent
      captchaImage={'https://proza.ru/pics/2019/09/28/948.jpg'}
      item={'книги серии Гарри Поттер'}
      correctTiles={[]}
    />
  )
}

export default CaptchaThree