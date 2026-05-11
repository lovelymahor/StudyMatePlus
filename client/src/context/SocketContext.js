import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) {
      if (socket) socket.disconnect();
      setSocket(null);
      return;
    }

    const s = io('http://localhost:5000', { auth: { token } });
    setSocket(s);

    s.on('connect', () => {
      console.log('Socket connected', s.id);
    });

    s.on('connect_error', (err) => {
      console.warn('Socket connect error', err.message);
    });

    return () => {
      s.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
