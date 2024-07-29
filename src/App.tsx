import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import {
  AppThemeProvider,
  AuthProvider,
  DrawerProvider,
} from "./shared/contexts";
import { MenuLateral } from "./shared/components/menu-lateral/MenuLateral";
// Traduções
import "./shared/forms/Traducoes";
import { Login } from "./shared/components";

export const App = () => {
  return (
    // Autenticação
    <AuthProvider>
      {/* Provedor de temas para tudo que está dentro */}
      <AppThemeProvider>
        {/* Login */}
        <Login>
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
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
