import React from 'react'
import CaptchaComponent from '../components/CaptchaComponent'

const CaptchaOne = () => {
    return (
        <CaptchaComponent
            captchaImage={'https://avatars.mds.yandex.net/i?id=76b79e3f4b27908effcc797911f4efd3c5adfe9b-5296066-images-thumbs&n=13'}
            item={'машины'}
            correctTiles={[0, 1, 2, 3, 4, 5]}
        />
    )
}

export default CaptchaOne