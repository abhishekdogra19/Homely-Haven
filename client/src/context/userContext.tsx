import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}
interface UserObj {
  name: string;
  email: string;
}
interface UserContextValue {
  user: UserObj | null;
  setUser: (arg0: UserObj | null) => void;
  ready: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserObj | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get("/user/getUserProfile");
          setUser(data);
        } catch (error) {
          console.log("error");
        }
        setReady(true);
      };
      fetchUser();
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
