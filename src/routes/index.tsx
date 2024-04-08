// Export para tudo
// export {};
import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

// Configurar o pacote DOM
export const AppRoutes = () => {
  return (
    // Em torno de todas as rotas
    <Routes>
      {/* Rota */}
      <Route
        path="/pagina-inicial"
        element={
          <Button variant="contained" color="primary">
            Teste
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
