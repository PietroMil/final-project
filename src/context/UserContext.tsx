import { createContext } from "react";
import { app } from "../config/config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(app);

export const UserContext: any = createContext({
  user: null,
  isLoading: true,
  error: null,
});

export const UserContextProvider = ({ children }: any) => {
  const [user, isLoading, error] = useAuthState(auth);
  const contextValue = {
    user: user,
    isLoading: isLoading,
    error: error,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
