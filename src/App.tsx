import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts";

export const App = () => {
  return (
    // Provedor de temas para tudo que está dentro
    <AppThemeProvider>
      {/* Troca de tema */}
      {/* Fornece o contexto para o DOM funcionar corretamente */}
      <BrowserRouter>
        {/* Chamar as rotas */}
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  );
};
