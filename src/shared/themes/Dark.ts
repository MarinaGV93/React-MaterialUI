// Pegar o tema
import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

export const DarkTheme = createTheme({
  // Cor
  palette: {
    // Algumas partes já muda as cores para ter contraste com o tema escuro
    mode: "dark",
    // Primaria - coisas com mais destaque
    primary: {
      main: yellow[700], // Intensidade

      // Mais escuro
      dark: yellow[800],

      // Mais claro
      light: yellow[500],

      // Contraste com a cor primária
      contrastText: "#fff",
    },

    // Secundária
    secondary: {
      main: cyan[500], // Intensidade

      // Mais escuro
      dark: cyan[400],

      // Mais claro
      light: cyan[300],

      // Contraste com a cor secundária
      contrastText: "#fff",
    },

    background: {
      // Fundo
      default: "#202124",

      // Card
      paper: "#303134",
    },
  },
  // Específico para os componentes de tipografia
  typography: {
    // Todas as variantes
    allVariants: {
      color: "white",
    },
  },
});
