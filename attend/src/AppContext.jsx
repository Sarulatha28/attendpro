import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [employees, setEmployees] = useState([]); // ✅ always an array
  const [updates, setUpdates] = useState([]); // attendance updates (recent)
  const [company, setCompany] = useState(null); // { name, lat, lng, radius }
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eRes, cRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/employees`),
          axios.get(`${import.meta.env.VITE_API_URL}/company`),
        ]);

        // ✅ ensure employees is always an array
        const empData = Array.isArray(eRes.data)
          ? eRes.data
          : eRes.data?.employees || [];

        setEmployees(empData);
        setCompany(cRes.data?.[0] || null);
      } catch (err) {
        console.warn("initial load error", err);
        setEmployees([]); // fallback
        setCompany(null);
      }
    };

    loadData();

    // ✅ setup socket
    const baseUrl =
      import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

    const s = io(baseUrl, {
      transports: ["websocket"], // force websocket, avoids polling issues
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    s.on("connect", () => console.log("✅ socket connected:", s.id));
    s.on("connect_error", (err) =>
      console.error("❌ socket connection error:", err.message)
    );

    s.on("attendance:update", (data) => {
      setUpdates((u) => [data, ...u].slice(0, 10));
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  const addEmployeeLocal = (emp) => {
    setEmployees((prev) => [emp, ...prev]);
  };

  const updateCompanyLocal = (c) => {
    setCompany(c);
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        setEmployees,
        addEmployeeLocal,
        updates,
        setUpdates,
        company,
        updateCompanyLocal,
        socket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
