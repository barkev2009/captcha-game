export const SCAN_FACE = 'SCAN_FACE';
export const CAPTCHA_1 = 'CAPTCHA_1';

export const STAGES = [
    SCAN_FACE,
    CAPTCHA_1
]

export const nextStage = (currentStage) => {
    return STAGES.indexOf(currentStage) + 1 < STAGES.length ? STAGES[STAGES.indexOf(currentStage) + 1] : currentStage
}