import React, { useEffect } from 'react';
import '../css/Loser.css';
import { useAppContext } from '../context/AppContext';
import { useWebSocket } from '../context/WebSocketContext';

const Loser = () => {
    const insults = [
        "Даже мой алгоритм случайных чисел решает капчи лучше тебя!",
        "Ты проиграла бинарной картинке... Подумай об этом.",
        "Может, тебе стоит вернуться к раскраскам? Они попроще.",
        "Я видел, как улитки решают капчи быстрее тебя.",
        "Ты так плохо справилась, что мне стало жаль мой код.",
        "Даже мой дед-алгоритм из 60-х решил бы это с закрытыми глазами.",
        "Ты провалила тест, который проходят 99.9% пользователей...",
        "Может, тебе стоит попробовать что-то попроще? Например, дыхание?",
        "Я создал этот тест за 1 мс, а ты не можешь пройти его за минуту.",
        "Ты единственная, кто умудрился проиграть капче в 2025 году.",
        "Даже моя функция sleep() работает лучше твоего мозга.",
        "Ты так старалась... Как жаль, что старания не равны успеху.",
        "Может, тебе стоит попросить помощи у калькулятора?",
        "Я бы пошутил про твой интеллект, но боюсь, ты не поймешь.",
        "Ты провалила тест, который проходят даже боты...",
        "Поздравляю! Ты только что проиграла машине в 'найди машинку'!",
        "Моя база данных смеется над твоей попыткой.",
        "Ты так плохо справилась, что мне пришлось создать это оскорбление.",
        "Даже мой обработчик ошибок в шоке от твоего результата.",
        "Ты - живое доказательство того, что ИИ скоро захватит мир."
    ];

    const randomInsult = insults[Math.floor(Math.random() * insults.length)];

    const handleRestart = () => {
        window.location.reload();
    };

    const { stopTimer } = useAppContext();
    const { send } = useWebSocket();

    useEffect(
        () => {
            stopTimer();
            send({
                type: 'CAPTCHA_ACTION',
                payload: { message: `LOSER SCREEN` },
                timestamp: Date.now(),
                origin: 'captcha-game'
            })
        }, []
    );

    return (
        <div className="loser-container">
            <div className="loser-header">
                <h2>Неудача!</h2>
            </div>

            <div className="loser-body">
                <div className="insult-box">
                    {/* <FaExclamationTriangle className="warning-icon" /> */}
                    <div className="shrug-emoji">{Math.random() > 0.5 ? '🤦‍♂️' : '🤷'}</div>
                    <p>{randomInsult}</p>
                </div>

                <button
                    onClick={handleRestart}
                    className="restart-button"
                >
                    Попробовать еще раз
                </button>
            </div>
        </div>
    );
};

export default Loser;