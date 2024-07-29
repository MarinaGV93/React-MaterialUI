import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "../services/api/auth/AuthService";

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

/**
 * Contexto de autenticação
 *  */
const AuthContext = createContext(
  // O que irá compartilhar
  {} as IAuthContextData
);

// Chave do localStorage
const LOCAL_STORAGE_KEY_ACCESS_TOKEN = "APP_ACCESS_TOKEN";

// A PARTIR DO REACT 18

interface IAuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  // Se colocar uma tipagem e nao informa nenhum parametro, o state vai ser a tipagem ou undefined
  const [accessToken, setAccessToken] = useState<string>();

  // Resgatar o token se fechar o navegador para nao fazer login novamente
  // Tem como fazer uma forma mais segura de guardar o token
  useEffect(() => {
    const accessToken = localStorage.getItem(
      // Chave
      LOCAL_STORAGE_KEY_ACCESS_TOKEN
    );
    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, []);

  /**
   * Realizar login
   */
  // Callback = Usar sempre que usar uma função dentro de um contexto que vai ser passada por contexto
  const handleLogin = useCallback(async (email: string, password: string) => {
    /**
     * Realizar a autenticação
     */

    // await = aguardar. Usar quando tiver uma chamada assíncrona
    const result = await AuthService
      // Quando a promessa for finalizada, atribui a resposta a variável result
      .auth(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(
        // Chave
        LOCAL_STORAGE_KEY_ACCESS_TOKEN,
        // Passa o quer ser guardado
        JSON.stringify(result.acessToken)
      );
      setAccessToken(result.acessToken);
    }
  }, []);

  /**
   * Realizar logout
   *  */
  const handleLogout = useCallback(() => {
    localStorage.removeItem(
      // Chave
      LOCAL_STORAGE_KEY_ACCESS_TOKEN
    );
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(
    () =>
      // Se tiver string, é true.
      // Nega true = false
      // Nega false = true
      !!accessToken,
    // accessToken !== undefined
    [accessToken]
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
