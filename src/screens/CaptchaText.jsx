import React, { useState, useRef, useEffect } from 'react';
import '../css/CaptchaText.css';
import { useAppContext } from '../context/AppContext';
import RandomKeyboard from '../components/RandomKeyboard';

const CaptchaText = () => {
    const canvasRef = useRef(null);
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isValid, setIsValid] = useState(null);
    const { updateStage } = useAppContext();

    // Генерация случайного текста для CAPTCHA
    const generateText = () => {
        const chars = 'ABDEFGHJKLMNPQRSTWXYZ23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    // Отрисовка CAPTCHA с искажениями
    const drawCaptcha = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const text = generateText();
        setCaptchaText(text);

        // Очистка canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Фон
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Искажённый текст
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = '#0074da';

        for (let i = 0; i < text.length; i++) {
            // Случайные смещения и повороты
            const x = 15 + i * 22 + Math.random() * 5;
            const y = 35 + Math.random() * 10;
            const rot = (Math.random() - 0.5) * 0.9;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rot);
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
        }

        // Шумовые линии
        ctx.strokeStyle = '#aaa';
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

        // Шумовые точки
        for (let i = 0; i < 100; i++) {
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3})`;
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    };

    // Первичная отрисовка
    useEffect(() => {
        drawCaptcha();
    }, []);

    const handleSubmit = () => {
        const correct = userInput.toUpperCase() === captchaText;
        setIsValid(correct);
        if (correct) {
            updateStage();
        }
    };

    const handleRefresh = () => {
        drawCaptcha();
        setUserInput('');
        setIsValid(null);
    };

    const handleKeyPress = (action) => {
        setIsValid(null);
        if (action.type === 'backspace') {
            setUserInput(prev => prev.slice(0, -1));
        } else if (action.type === 'char') {
            setUserInput(prev => prev + action.value);
        }
    };

    return (
        <div className="captcha-container">
            <div className="captcha-header">
                <p>Напоследок)</p>
                <h2>Подтвердите, что вы не робот</h2>
            </div>

            <div className="captcha-body">
                <div className="captcha-image-container">
                    <canvas
                        ref={canvasRef}
                        width={200}
                        height={60}
                        className="captcha-canvas"
                    />
                    <button
                        onClick={handleRefresh}
                        className="refresh-button"
                    >
                        ↻
                    </button>
                </div>

                <input
                    type="text"
                    value={userInput}
                    readOnly
                    onChange={(e) => setUserInput(e.target.value)}
                    className={`captcha-input ${isValid === false ? 'input-error' : ''}`}
                    placeholder="Введите текст с картинки"
                />

                <RandomKeyboard onKeyPress={handleKeyPress} />

                <div className="captcha-actions">
                    <button
                        onClick={handleSubmit}
                        className={`skip-button ${isValid ? 'verified' : ''}`}
                        disabled={!userInput}
                    >
                        Проверить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CaptchaText;