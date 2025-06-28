import React, { useState, useEffect } from 'react';
import '../css/CaptchaComponent.css';
import { useAppContext } from '../context/AppContext';

const CaptchaComponent = ({ captchaImage, item, correctTiles }) => {

    const [selectedTiles, setSelectedTiles] = useState([]);
    const { updateStage } = useAppContext();

    const getPosition = (index) => {
        let x, y;
        if ([0, 3, 6].includes(index)) {
            x = 0
        }
        else if ([1, 4, 7].includes(index)) {
            x = 50;
        }
        else if ([2, 5, 8].includes(index)) {
            x = -50;
        }
        if ([0, 1, 2].includes(index)) {
            y = 0
        }
        if ([3, 4, 5].includes(index)) {
            y = 50
        }
        if ([6, 7, 8].includes(index)) {
            y = 100
        }
        return { x, y }
    }

    const getTileStyle = (index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const size = 100 / 3;
        const { x, y } = getPosition(index);

        return {
            position: 'absolute',
            width: `${size}%`,
            height: `${size}%`,
            left: `${col * size}%`,
            top: `${row * size}%`,
            backgroundImage: `url(${captchaImage})`,
            backgroundSize: '300% 300%',
            backgroundPosition: `${x}% ${y}%`,
            border: '2px solid white'
        };
    };

    const toggleTile = (index) => {
        setSelectedTiles(prev =>
            prev.includes(index)
                ? prev.filter(tile => tile !== index)
                : [...prev, index]
        );
        if (!correctTiles.includes(index)) {
            setSelectedTiles([]);
        }
    };

    const skipCaptcha = () => {
        alert('Капча пропущена. Возможно, будут ограничения.');
    };

    useEffect(
        () => {
            if (JSON.stringify(correctTiles.sort()) === JSON.stringify(selectedTiles.sort())) {
                setTimeout(
                    () => {
                        updateStage();
                    }, 1000
                );
            }
        }, [selectedTiles, correctTiles, updateStage]
    );

    return (
        <div className="captcha-container">
            <div className="captcha-header">
                <p>Отметьте все квадраты, где изображены</p>
                <h2>{item}</h2>
                <p>Если элементов нет, нажмите "Пропустить"</p>
            </div>

            <div className="captcha-body">
                <div className="tiles-container">
                    {Array(9).fill(0).map((_, index) => (
                        <div
                            key={index}
                            className={`tile ${selectedTiles.includes(index) ? 'selected' : ''} ${correctTiles.includes(index) ? 'right' : 'wrong'}`}
                            style={getTileStyle(index)}
                            onClick={() => toggleTile(index)}
                        />
                    ))}
                </div>

                <div className="captcha-actions">
                    <button
                        onClick={skipCaptcha}
                        className="skip-button"
                    >
                        Пропустить
                    </button>
                </div>
            </div>
        </div>
    );

};

export default CaptchaComponent;