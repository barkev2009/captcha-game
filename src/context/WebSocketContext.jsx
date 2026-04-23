// WebSocketContext.js
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children, url }) => {
    const [isReady, setIsReady] = useState(false);
    const ws = useRef(null);
    const messageQueue = useRef([]);

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            setIsReady(true);
            // Отправляем все сообщения из очереди
            messageQueue.current.forEach(msg => socket.send(msg));
            messageQueue.current = [];
        };

        socket.onclose = () => setIsReady(false);
        socket.onerror = () => setIsReady(false);

        ws.current = socket;

        return () => {
            socket.close();
        };
    }, [url]);

    const send = (data) => {
        const message = JSON.stringify(data);

        if (isReady && ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        } else {
            // Добавляем в очередь, если соединение не готово
            messageQueue.current.push(message);
        }
    };

    return (
        <WebSocketContext.Provider value={{ send, isReady }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within WebSocketProvider');
    }
    return context;
};