import React, { useEffect } from "react";
import ScanFace from "./screens/ScanFace";
import './index.css'
import { CAPTCHA_1, CAPTCHA_2, CAPTCHA_3, CAPTCHA_TEXT, CHECKS_TERMS, FINAL, SCAN_FACE, TIMER_LIMIT } from "./const";
import { AppProvider, useAppContext } from "./context/AppContext";
import CaptchaOne from "./screens/CaptchaOne";
import CaptchaTwo from "./screens/CaptchaTwo";
import CaptchaThree from "./screens/CaptchaThree";
import ChecksTerms from "./screens/ChecksTerms";
import Final from "./screens/Final";
import CaptchaText from "./screens/CaptchaText";
import Loser from "./screens/Loser";
import { WebSocketProvider } from "./context/WebSocketContext";

function AppWrapper() {
  return (
    <WebSocketProvider url={process.env.REACT_APP_WEBSOCKET}>
      <AppProvider>
        <App />
      </AppProvider>
    </WebSocketProvider>
  );
}

function App() {
  const { stage, startTimer, timer, formatTime } = useAppContext();
  useEffect(() => startTimer(), []);

  const renderStage = () => {
    switch (stage) {
      case SCAN_FACE:
        return <ScanFace />
      case CAPTCHA_1:
        return <CaptchaOne />
      case CAPTCHA_2:
        return <CaptchaTwo />
      case CAPTCHA_3:
        return <CaptchaThree />
      case CHECKS_TERMS:
        return <ChecksTerms />
      case CAPTCHA_TEXT:
        return <CaptchaText />
      case FINAL:
        return <Final />
      default:
        <p>YOU WIN</p>
    }
  }

  if (timer > TIMER_LIMIT) {
    return <Loser />
  }

  return (
    <div className="app">
      <div className='timer-window'>
        <div>У вас осталось:</div>
        <div className="time">{formatTime(timer)}</div>
      </div>
      {renderStage()}
    </div>
  );
}

export default AppWrapper;
