import React, { useState, useMemo } from 'react'
import TermsAndConditions from './TermsAndConditions'
import '../css/CaptchaComponent.css'
import '../css/ChecksTerms.css'
import { useAppContext } from '../context/AppContext'

const ChecksTerms = () => {
    const [checkedStates, setCheckedStates] = useState({});
    const [showTerms, setShowTerms] = useState(false);
    const [termsRead, setTermsRead] = useState(false);
    const {updateStage} = useAppContext();

    const checks = useMemo(() => [
        "Я подтверждаю, что мне есть 18 лет",
        "Я согласен с условиями пользования",
        "Я не являюсь роботом",
        "Я принимаю политику конфиденциальности",
        "Я согласен получать уведомления",
        "Я подтверждаю достоверность информации",
        "Я принимаю правила сообщества",
        "Я согласен с обработкой персональных данных",
        {
            text: "Я прочитал и ознакомился с условиями соглашения",
            isTerms: true
        },
        "Я подтверждаю свое согласие на участие",
        "Я принимаю условия конкурса",
        "Я согласен с тарифами на услуги",
        "Я подтверждаю отсутствие вредоносных намерений",
        "Я принимаю условия возврата",
        "Я согласен с регламентом проведения",
        "Я подтверждаю ответственность за свои действия",
        "Я принимаю условия доставки",
        "Я согласен с офертой",
        "Я подтверждаю правильность указанных данных",
        "Я принимаю окончательность своего выбора"
    ], []);

    const toggleCheck = (index) => {
        const item = checks[index];

        // Для обычных чекбоксов
        if (!item.isTerms) {
            setCheckedStates(prev => ({
                ...prev,
                [index]: !prev[index]
            }));
            return;
        }

        // Для чекбокса с условиями
        if (termsRead) {
            setCheckedStates(prev => ({
                ...prev,
                [index]: !prev[index]
            }));
        }
    };

    const handleTermsClick = () => {
        if (!termsRead) {
            setShowTerms(true);
        }
    };

    const handleSubmit = () => {
        updateStage();
        // console.log("Отправленные состояния:", checkedStates);
        // Логика обработки отправки
    };

    const handleTermsRead = () => {
        setTermsRead(true);
        setShowTerms(false);

        // Автоматически отмечаем чекбокс с условиями
        const termsIndex = checks.findIndex(item => item.isTerms);
        if (termsIndex !== -1) {
            setCheckedStates(prev => ({
                ...prev,
                [termsIndex]: true
            }));
        }
    };

    if (showTerms) {
        return <TermsAndConditions onBack={handleTermsRead} />;
    }

    return (
        <div className="captcha-container">
            <div className="captcha-header">
                <h2>Почти закончили</h2>
            </div>

            <div className="captcha-body">
                <div className="checks-container">
                    {checks.map((item, index) => {
                        const text = typeof item === 'object' ? item.text : item;
                        const isTermsItem = item.isTerms;
                        const isChecked = checkedStates[index];

                        return (
                            <div
                                key={index}
                                className={`checkbox ${isChecked ? 'checked' : ''} ${isTermsItem && !termsRead ? 'terms-not-read' : ''}`}
                                onClick={() => !isTermsItem && toggleCheck(index)}
                            >
                                <div
                                    className={`checkbox-icon ${isTermsItem && !termsRead ? 'terms-icon' : ''}`}
                                    onClick={(e) => {
                                        if (isTermsItem) {
                                            e.stopPropagation();
                                            handleTermsClick();
                                        }
                                    }}
                                >
                                    {isChecked && <span>✓</span>}
                                    {isTermsItem && !termsRead && <span className="terms-alert">!</span>}
                                </div>
                                <div
                                    className="checkbox-label"
                                    onClick={(e) => {
                                        if (isTermsItem) {
                                            e.stopPropagation();
                                            handleTermsClick();
                                        }
                                    }}
                                >
                                    {text}
                                    {isTermsItem && !termsRead && (
                                        <span className="terms-hint"> (нажмите для прочтения)</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="captcha-actions">
                    <button
                        className="skip-button"
                        onClick={handleSubmit}
                        disabled={!termsRead || Object.values(checkedStates).filter(Boolean).length < checks.length}
                    >
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChecksTerms