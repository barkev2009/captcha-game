import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { FaceDetection } from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";

const FaceDetector = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [faceDetected, setFaceDetected] = useState(false);

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

            // Очищаем canvas перед новой отрисовкой
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Если есть обнаруженные лица, рисуем рамку
            if (results.detections && results.detections.length > 0) {
                setFaceDetected(true);

                // Перебираем все обнаруженные лица
                results.detections.forEach((detection) => {
                    const { boundingBox } = detection;

                    // Координаты рамки (нормализованные от 0 до 1, поэтому умножаем на ширину/высоту)
                    const x = boundingBox.xCenter * canvas.width - boundingBox.width * canvas.width / 2;
                    const y = boundingBox.yCenter * canvas.height - boundingBox.height * canvas.height / 2;
                    const width = boundingBox.width * canvas.width;
                    const height = boundingBox.height * canvas.height;

                    // Рисуем прямоугольник вокруг лица
                    ctx.strokeStyle = "yellow"; // Зеленая рамка
                    ctx.lineWidth = 10;
                    ctx.strokeRect(x, y, width, height);

                    // Можно добавить текст (опционально)
                    ctx.fillStyle = "#00FF00";
                    ctx.font = "20px Arial";
                    ctx.fillText("Face", x, y - 10);
                });
            } else {
                setFaceDetected(false);
            }
        });

        // Запускаем камеру только после загрузки модели
        if (webcamRef.current?.video) {
            const camera = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (webcamRef.current?.video) {
                        await faceDetection.send({ image: webcamRef.current.video });
                    }
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }

        return () => {
            faceDetection.close();
        };
    }, []);

    return (
        <div className="video-container">
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "user" }}
            />
            <canvas
                ref={canvasRef}
                width={640}
                height={480}
            />
            {faceDetected && (
                <p style={{ color: "green", fontSize: "20px" }}>Лицо обнаружено! ✅</p>
            )}
        </div>
    );
};

export default FaceDetector;