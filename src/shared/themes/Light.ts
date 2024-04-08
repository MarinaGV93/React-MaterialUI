// Pegar o tema
import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

// Tema padrão
// export const LightTheme = createTheme();

export const LightTheme = createTheme({
  // Cor
  palette: {
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
      default: "#fff",

      //   Card
      paper: "#f7f6f3",
    },
  },
});
