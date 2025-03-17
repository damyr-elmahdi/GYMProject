import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  async function getUser() {
    try {
      const res = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      console.log("User data:", data); // Add this line for debugging

      if (res.ok) {
        setUser(data);
        setIsAdmin(data.role === 'admin');
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser, isAdmin }}>
      {children}
    </AppContext.Provider>
  );
}