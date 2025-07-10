import React, { useEffect, useRef, useState } from "react";
import videoSource from "../video/rick.mp4"; // Импортируем видео как модуль

const VideoPlayer = ({ onClose }) => {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const styles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        video: {
            maxWidth: "90%",
            maxHeight: "90%",
            width: "auto",
            height: "auto",
        },
        closeButton: {
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "transparent",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
            transition: 'all .5s ease-in-out',
            opacity: isVisible ? '100%' : '0%'
        },
    };

    useEffect(
        () => {
            setTimeout(() => setIsVisible(true), 5000);
        }, []
    );

    return (
        <div style={styles.overlay}>
            <button style={styles.closeButton} onClick={onClose}>
                ×
            </button>
            <video
                ref={videoRef}
                src={videoSource} // Используем импортированный источник
                controls
                style={styles.video}
                autoPlay
                playsInline
                loop
            />
        </div>
    );
};

export default VideoPlayer;