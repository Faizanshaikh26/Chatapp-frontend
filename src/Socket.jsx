import { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import { server } from './constants/config';


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io(server)
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
