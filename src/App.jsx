import React from "react";
import ScanFace from "./screens/ScanFace";
import './index.css'
import { CAPTCHA_1, CAPTCHA_2, CAPTCHA_3, SCAN_FACE } from "./const";
import { AppProvider, useAppContext } from "./context/AppContext";
import CaptchaOne from "./screens/CaptchaOne";
import CaptchaTwo from "./screens/CaptchaTwo";
import CaptchaThree from "./screens/CaptchaThree";

function AppWrapper() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

function App() {
  const { stage } = useAppContext();

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
