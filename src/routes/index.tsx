// Export para tudo
// export {};

// import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

// import { useAppThemeContext } from "../shared/contexts";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, ListagemDePessoas } from "../pages";

// Configurar o pacote DOM
export const AppRoutes = () => {
  // Botão mudar o tema
  //  const { toggleTheme } = useAppThemeContext();

  // Botão mostrar ou fechar menu
  const {
    // toggleDrawerOpen,
    setDrawerOptions,
  } = useDrawerContext();

  // Fazer alguns efeitos
  //   Garantir que seja executado somente 1 vez, sem ficar renderizando
  useEffect(() => {
    setDrawerOptions([
      {
        // Passar as chaves
        icon: "home",
        path: "/pagina-inicial",
        label: "Página inicial",
      },
      {
        icon: "people",
        path: "/pessoas",
        label: "Pessoas",
      },
    ]);
  }, []);

  return (
    // Em torno de todas as rotas
    <Routes>
      {/* Rota */}
      <Route
        path="/pagina-inicial"
        element={
          <Dashboard />
          // <Button
          //   variant="contained"
          //   color="primary"
          //   // onClick={toggleTheme}
          //   onClick={toggleDrawerOpen}
          // >
          //   Trocar tema
          // </Button>
        }
      />

      <Route
        path="/pessoas"
        element={<ListagemDePessoas/>}
      />

      {/* Para edição */}
      {/* <Route path="/pessoas/detalhe/:id" element={<ListagemDePessoas />} /> */}

      {/* Se não encontrar a rota, passa para a outra  */}

      {/*
       * = qualquer coisa na barra de endereço, que não seja as rotas criadas, irá renderizar (navegar) para uma página
       */}
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
