import { io } from "socket.io-client";
import { useEffect } from "react";

export const socket = io("http://localhost:5000", {
  transports: ["websocket"], // ✅ force WebSocket
  reconnectionAttempts: 5,   // retry 5 times
  reconnectionDelay: 1000,   // wait 1s between attempts
});

export const AppProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket.IO connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ socket disconnected:", reason);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
};
