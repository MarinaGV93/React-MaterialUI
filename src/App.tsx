import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "@mui/material";
import { LightTheme } from "./shared/themes";

export const App = () => {
  return (
    // Provedor de temas
    <ThemeProvider theme={LightTheme}>
      // Fornece o contexto para o DOM funcionar corretamente
      <BrowserRouter>
        {/* Chamar as rotas */}
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};
