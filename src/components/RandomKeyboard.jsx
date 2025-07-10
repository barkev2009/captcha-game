import React, { useState, useEffect } from 'react';
import '../css/RandomKeyboard.css';

const RandomKeyboard = ({ onKeyPress }) => {
    // Буквы и цифры (без пробела и backspace)
    const letterAndNumberKeys = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
    ];

    const [randomKeys, setRandomKeys] = useState([]);

    // Разбиваем клавиши на 3 ряда
    const row1 = randomKeys.slice(0, 12);
    const row2 = randomKeys.slice(12, 24);
    const row3 = randomKeys.slice(24, 36);

    useEffect(() => {
        shuffleKeys();
    }, []);

    const shuffleKeys = () => {
        const shuffled = [...letterAndNumberKeys].sort(() => Math.random() - 0.5);
        setRandomKeys(shuffled);
    };

    const handleKeyClick = (key) => {
        if (!onKeyPress) return;

        if (key === 'Backspace') {
            // Специальный сигнал для удаления последнего символа
            onKeyPress({ type: 'backspace' });
        } else {
            // Обычный символ
            onKeyPress({
                type: 'char',
                value: key === ' ' ? ' ' : key
            });
        }
    };

    return (
        <div className="keyboard-container">
            <div className="keyboard-rows">
                {/* Первый ряд */}
                <div className="keyboard-row">
                    {row1.map((key, index) => (
                        <button
                            key={`row1-${index}`}
                            className="key"
                            onClick={() => handleKeyClick(key)}
                        >
                            {key}
                        </button>
                    ))}
                </div>

                {/* Второй ряд */}
                <div className="keyboard-row">
                    {row2.map((key, index) => (
                        <button
                            key={`row2-${index}`}
                            className="key"
                            onClick={() => handleKeyClick(key)}
                        >
                            {key}
                        </button>
                    ))}
                </div>

                {/* Третий ряд */}
                <div className="keyboard-row">
                    {row3.map((key, index) => (
                        <button
                            key={`row3-${index}`}
                            className="key"
                            onClick={() => handleKeyClick(key)}
                        >
                            {key}
                        </button>
                    ))}
                </div>

                {/* Ряд с пробелом и backspace */}
                <div className="keyboard-row">
                    <button
                        className="key space"
                        onClick={() => handleKeyClick(' ')}
                    >
                        Space
                    </button>
                    <button
                        className="key backspace"
                        onClick={() => handleKeyClick('Backspace')}
                    >
                        ←
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RandomKeyboard;