import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

const Final = () => {

    const { timer, stopTimer } = useAppContext();

    const [ip, setIP] = useState('');

    //creating function to load ip address from the API
    const getData = async () => {
        const res = await fetch('https://geolocation-db.com/json/');
        const json = await res.json();
        console.log(json.IPv4);
        console.log(timer);
        setIP(json.IPv4);
        let fields = [
            '<b>Зафиксировано прохождение CAPTCHA</b>',
            // '<b>IP участника</b>: ' + json.IPv4,
            '<b>Время в секундах</b>: ' + timer,
        ]
        let msg = ''
        //проходимся по массиву и склеиваем все в одну строку
        fields.forEach(field => {
            msg += field + '\n'
        });
        //кодируем результат в текст, понятный адресной строке
        msg = encodeURI(msg)

        await axios.post(
            `https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/sendMessage?chat_id=${process.env.REACT_APP_CHAT_ID}&parse_mode=html&text=${msg}`
        )
    }

    useEffect(
        () => {
            stopTimer();
            getData()
        }, []
    );

    return (
        <div>Final</div>
    )
}

export default Final