import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react';
import { CAPTCHA_1, CAPTCHA_TEXT, CHECKS_TERMS, nextStage, SCAN_FACE } from '../const';

// 1. Создаем контекст
const AppContext = createContext();

// 2. Создаем провайдер
export const AppProvider = ({ children }) => {
    const [stage, setStage] = useState(SCAN_FACE);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

    const updateStage = useCallback(() => {
        setStage(prev => nextStage(prev));
    }, []); // Никаких зависимостей, так как функция не зависит от внешних значений

    const startTimer = useCallback(() => {
        const startTime = Date.now();
        timerRef.current = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            setTimer(parseFloat(elapsedTime.toFixed(2)));
        }, 10);
    }, []);

    const stopTimer = useCallback(() => {
        clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <AppContext.Provider value={{ stage, updateStage, timer, startTimer, stopTimer }}>
            {children}
        </AppContext.Provider>
    );
};

// 3. Создаем кастомный хук для удобства
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};
