"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

export type Role = "employer" | "employee";
export interface User {
  id: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  loginSuccess: (result: any) => void;
  logout: () => void;
  signUpSuccess: (result: any) => void;
  isLogin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loginSuccess: () => {},
  logout: () => {},
  signUpSuccess: () => {},
  isLogin: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      const id = localStorage.getItem("id");
      const type = localStorage.getItem("type") as Role;
      if (id && type) {
        setUser({ id, role: type });
      }
    } else {
      setIsLogin(false);
      setUser(null);
    }
  }, []);

  const loginSuccess = (result: any) => {
    const { id, type } = result.item.user.item;
    const token = result.item.token;
    localStorage.setItem("id", id);
    localStorage.setItem("type", type);
    localStorage.setItem("token", token);
    setIsLogin(true);
  };

  const signUpSuccess = (result: any) => {
    const { id, type } = result.item;
    localStorage.setItem("id", id);
    localStorage.setItem("type", type);
    localStorage.setItem("token", result.item.token);
    setUser({ id, role: type });
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    localStorage.removeItem("token");
    setUser(null);
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginSuccess,
        logout,
        signUpSuccess,
        isLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
