import { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io("https://chatapp-frontend-rose-six.vercel.app", {
      withCredentials: true,
    });
  }, []);
  
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

export { SocketProvider, useSocket };

