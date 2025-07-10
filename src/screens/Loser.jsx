import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'

const Loser = () => {

    const { stopTimer } = useAppContext();

    useEffect(
        () => stopTimer(), []
    );

    return (
        <div>Loser</div>
    )
}

export default Loser