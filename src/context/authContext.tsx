import Cookies from 'js-cookie';
import { useContext, useState, createContext, Dispatch, SetStateAction, useEffect } from 'react';

interface UserDto {
  id: string;
  name: string;
  username: string;
  email: string;

  photoProfile: string;
}

export interface AuthContextType {
  token: any;
  user?: UserDto;
  setToken: Dispatch<SetStateAction<string>>;
  handleUser: (data: UserDto) => void;
}
export const AuthContext = createContext<AuthContextType>({} as any);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<any>(null);
  const [user, setUser] = useState<UserDto>({
    id: '',
    name: '',
    username: '',
    email: '',
    photoProfile: '',
  });

  useEffect(() => {
    const tokens = Cookies.get('token');
    if (tokens) {
      setToken(tokens);
    } else {
      setToken('');
    }
  }, []);

  const handleUser = (data: UserDto) => {
    if (data) {
      setUser(data);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        handleUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
