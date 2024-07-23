import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { MenuLateral } from "./shared/components/menu-lateral/MenuLateral";
// Traduções
import "./shared/forms/Traducoes";

export const App = () => {
  return (
    // Provedor de temas para tudo que está dentro
    <AppThemeProvider>
      {/* Mostrar ou fechar menu */}
      <DrawerProvider>
        {/* Troca de tema */}
        {/* Fornece o contexto para o DOM funcionar corretamente */}
        <BrowserRouter>
          {/* Menu lateral */}
          <MenuLateral>
            {/* Chamar as rotas */}
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
