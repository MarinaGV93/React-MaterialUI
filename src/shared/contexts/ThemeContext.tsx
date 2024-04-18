// Troca de tema
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Box, ThemeProvider } from "@mui/material";

import { DarkTheme, LightTheme } from "./../themes";

// Interface
//     Dados compartilhados do contexto com todos os atributos
interface IThemeContextProps {
  // Aceitar certos valores (os temas)
  themeName: "light" | "dark";

  // Alternar os temas
  toggleTheme: () => void;
}

// Criar contexto para o tema
//     Compartilhar informações entre diversos componentes/páginas com {um atributo para ser compartilhado} todos os filhos
//     O contexto tem as propriedades da interface

const ThemeContext = createContext({} as IThemeContextProps);

interface IAppThemeProviderProps {
  // Filhos
  children: React.ReactNode;
}

// Função que vai retornar as propriedades dos temas

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

// Usar o contexto
//     React.FC = componente funcional
//     <Receber a {interface}>
export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  // Tema claro por padrão
  // Passar com parametro
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  // useCallback = capacidade de armazenar uma função em memoria.
  // Faz com que a função não seja reconstruida toda vez que um state for alterado (renderizado)
  // Usado mais para função que for usar em mais lugares
  //  Passar 2 argumentos:
  //    1º - uma função. Vai ser armazenada
  //    2º - array de dependencias. Sempre que uma das dependencias for alterada, a função vai ser executada
  const toggleTheme = useCallback(() => {
    // Alternar o tema
    setThemeName(
      // Valor que tinha antes
      (oldThemeName) => (oldThemeName === "light" ? "dark" : "light")
    );
  }, []);

  // useMemo = capacidade de armazenar um calculo em memoria.
  //  Passar 2 argumentos:
  //    1º - uma função (calculo). Vai ser armazenada
  //    2º - array de dependencias. Sempre que uma das dependencias for alterada, o calculo vai ser executado
  const theme = useMemo(() => {
    if (themeName === "light") return LightTheme;
    return DarkTheme;
  }, [themeName]);

  return (
    // Prover as propriedades para os filhos com os values = os atributos
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {/* Propriedades especiais */}
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {/* Passar como filho */}
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
