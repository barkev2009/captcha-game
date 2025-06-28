import React, { createContext, useState, useContext } from 'react';
import { CAPTCHA_1, nextStage, SCAN_FACE } from '../const';

// 1. Создаем контекст
const AppContext = createContext();

// 2. Создаем провайдер
export const AppProvider = ({ children }) => {
    const [stage, setStage] = useState(CAPTCHA_1);

    // Функция для обновления состояния
    const updateStage = () => {
        setStage(prev => nextStage(prev));
    };

    return (
        <AppContext.Provider value={{ stage, updateStage }}>
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