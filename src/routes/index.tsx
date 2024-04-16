// Export para tudo
// export {};
import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useAppThemeContext } from "../shared/contexts";
import { useDrawerContext } from "../shared/contexts";

// Configurar o pacote DOM
export const AppRoutes = () => {
  // Botão mudar o tema
  //  const { toggleTheme } = useAppThemeContext();

  // Botão mostrar ou fechar menu
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    // Em torno de todas as rotas
    <Routes>
      {/* Rota */}
      <Route
        path="/pagina-inicial"
        element={
          <Button
            variant="contained"
            color="primary"
            // onClick={toggleTheme}
            onClick={toggleDrawerOpen}
          >
            Trocar tema
          </Button>
        }
      />
      {/* Se não encontrar a rota, passa para a outra  */}

      {/*
       * = qualquer coisa na barra de endereço, que não seja as rotas criadas, irá renderizar (navegar) para uma página
       */}
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
