import React, { useEffect } from "react";
import ScanFace from "./screens/ScanFace";
import './index.css'
import { CAPTCHA_1, CAPTCHA_2, CAPTCHA_3, CAPTCHA_TEXT, CHECKS_TERMS, FINAL, SCAN_FACE } from "./const";
import { AppProvider, useAppContext } from "./context/AppContext";
import CaptchaOne from "./screens/CaptchaOne";
import CaptchaTwo from "./screens/CaptchaTwo";
import CaptchaThree from "./screens/CaptchaThree";
import ChecksTerms from "./screens/ChecksTerms";
import Final from "./screens/Final";
import CaptchaText from "./screens/CaptchaText";

function AppWrapper() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

function App() {
  const { stage, startTimer } = useAppContext();

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

  return (
    <div className="app">
      {renderStage()}
    </div>
  );
}

export default AppWrapper;
