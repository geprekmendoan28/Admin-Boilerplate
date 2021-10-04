import Cookies from 'js-cookie';
import { useContext, useState, createContext, Dispatch, SetStateAction, useEffect } from 'react';

export interface ThemeContextType {
  theme: string;

  setTheme: Dispatch<SetStateAction<string>>;
}
export const ThemeContext = createContext<ThemeContextType>({} as any);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const themes = Cookies.get('theme');
    if (themes?.length) {
      setTheme(themes);
    } else {
      setTheme('light');
    }
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
export const useThemes = () => useContext(ThemeContext);
