"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: string | null;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USER = { userId: "admin", password: "admin123" };

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) setUser(sessionUser);
    setIsHydrated(true);
  }, []);

  const login = (userId: string, password: string) => {
    if (userId === DUMMY_USER.userId && password === DUMMY_USER.password) {
      sessionStorage.setItem("user", userId);
      setUser(userId);
      router.push("/home");
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {isHydrated ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
