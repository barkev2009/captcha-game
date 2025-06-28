import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { FaceDetection } from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import '../css/ScanFace.css'
import { useAppContext } from "../context/AppContext";

const ScanFace = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [faceDetected, setFaceDetected] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressInterval = useRef(null);
    const {updateStage} = useAppContext();

    useEffect(
        () => {
            if (progress === 100) {
                setTimeout(
                    () => {
                        updateStage()
                    }, 1000
                );
            }
        }, [progress, updateStage]
    );

    useEffect(() => {
        const faceDetection = new FaceDetection({
            locateFile: (file) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
        });

        faceDetection.setOptions({
            model: "short",
            minDetectionConfidence: 0.5,
        });

        faceDetection.onResults((results) => {
            const canvas = canvasRef.current;
            const video = webcamRef.current?.video;

            if (!canvas || !video) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scanArea = {
                x: canvas.width * 0.25,
                y: canvas.height * 0.25,
                width: canvas.width * 0.5,
                height: canvas.height * 0.5
            };

            if (results.detections && results.detections.length > 0) {
                let isFaceInScanArea = false;

                results.detections.forEach((detection) => {
                    const { boundingBox } = detection;
                    const x = boundingBox.xCenter * canvas.width - boundingBox.width * canvas.width / 2;
                    const y = boundingBox.yCenter * canvas.height - boundingBox.height * canvas.height / 2;
                    const width = boundingBox.width * canvas.width;
                    const height = boundingBox.height * canvas.height;

                    const faceCenterX = x + width / 2;
                    const faceCenterY = y + height / 2;
                    
                    if (
                        faceCenterX > scanArea.x &&
                        faceCenterX < scanArea.x + scanArea.width &&
                        faceCenterY > scanArea.y &&
                        faceCenterY < scanArea.y + scanArea.height
                    ) {
                        isFaceInScanArea = true;
                    }

                    ctx.strokeStyle = "yellow";
                    ctx.lineWidth = 4;
                    ctx.strokeRect(x, y, width, height);
                });

                setFaceDetected(isFaceInScanArea);
            } else {
                setFaceDetected(false);
            }
        });

        if (webcamRef.current?.video) {
            const camera = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (webcamRef.current?.video) {
                        await faceDetection.send({ image: webcamRef.current.video });
                    }
                },
                width: window.innerWidth,
                height: window.innerHeight,
            });
            camera.start();
        }

        return () => {
            faceDetection.close();
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    }, []);

    useEffect(() => {
        if (faceDetected) {
            progressInterval.current = setInterval(() => {
                setProgress(prev => Math.min(prev + 2, 100));
            }, 50);
        } else {
            progressInterval.current = setInterval(() => {
                setProgress(prev => Math.max(prev - 2, 0));
            }, 50);
        }

        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current);
            }
        };
    }, [faceDetected]);

    return (
        <div className="video-container">
            <div className="progress-header">Сканируем лицо...</div>
            <div className="progress-container">
                <div 
                    className="progress-bar" 
                    style={{ width: `${progress}%` }}
                ></div>
                <div className="progress-text">{progress}%</div>
            </div>
            
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{ 
                    facingMode: "user",
                    width: window.innerWidth,
                    height: window.innerHeight
                }}
            />
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
            />
            
            <div className="scan-frame">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
            </div>
        </div>
    );
};

export default ScanFace;