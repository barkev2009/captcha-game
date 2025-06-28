import React from "react";
import ScanFace from "./screens/ScanFace";
import './index.css'
import { CAPTCHA_1, SCAN_FACE } from "./const";
import { AppProvider, useAppContext } from "./context/AppContext";
import CaptchaComponent from "./screens/CaptchaComponent";

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
        return <CaptchaComponent />
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
