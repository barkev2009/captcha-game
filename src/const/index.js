export const SCAN_FACE = 'SCAN_FACE';
export const CAPTCHA_1 = 'CAPTCHA_1';
export const CAPTCHA_2 = 'CAPTCHA_2';
export const CAPTCHA_3 = 'CAPTCHA_3';
export const CHECKS_TERMS = 'CHECKS_TERMS';
export const CAPTCHA_TEXT = 'CAPTCHA_TEXT';
export const FINAL = 'FINAL';

export const STAGES = [
    SCAN_FACE,
    CAPTCHA_1,
    CAPTCHA_2,
    CAPTCHA_3,
    CHECKS_TERMS,
    CAPTCHA_TEXT,
    FINAL
]

export const nextStage = (currentStage) => {
    return STAGES.indexOf(currentStage) + 1 < STAGES.length ? STAGES[STAGES.indexOf(currentStage) + 1] : currentStage
}

export const TIMER_LIMIT = 70;