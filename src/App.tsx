import React, { createContext, useEffect, useState } from "react";
import Routes from "./pages";

import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<typeof Socket>(null);

function App() {
  const [socket, setSocket] = useState<typeof Socket>(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL);
    setSocket(socket);
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Routes />
    </SocketContext.Provider>
  );
}

export default App;
