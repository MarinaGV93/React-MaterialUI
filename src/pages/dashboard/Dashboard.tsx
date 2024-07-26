import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  debounce,
  Grid,
  Typography,
} from "@mui/material";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useState, useEffect } from "react";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const Dashboard = () => {
  // Guardar a quantidade total de registros que tem no BD
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);

  const [totalCountCidades, setTotalCountCidades] = useState(0);

  // Guardar a quantidade total de registros que tem no BD
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);

  const [totalCountPessoas, setTotalCountPessoas] = useState(0);

  // Só vai ser executado em momentos chave
  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);

    // Reexecutar a consulta para o backend, dando uma resposta, que pode demorar
    CidadesService.getAll(1)

      // Quando retornar
      // Pega o result
      .then((result) => {
        setIsLoadingCidades(false);
        setIsLoadingPessoas(false);

        // Mostrar na tela
        // Se for uma instancia de Erro. Deu erro na hora de consultar os registros no BD?
        if (result instanceof Error) {
          // Result é só erro
          alert(result.message);
        } else {
          setTotalCountCidades(result.totalCount);
        }
      });

    // Reexecutar a consulta para o backend, dando uma resposta, que pode demorar
    PessoasService.getAll(1)

      // Quando retornar
      // Pega o result
      .then((result) => {
        setIsLoadingPessoas(false);

        // Mostrar na tela
        // Se for uma instancia de Erro. Deu erro na hora de consultar os registros no BD?
        if (result instanceof Error) {
          // Result é só erro
          alert(result.message);
        } else {
          setTotalCountPessoas(result.totalCount);
        }
      });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      barraDeFerramentas={
        <FerramentasDaListagem mostrarBotaoNovo={false} />
        // <FerramentasDeDetalhe
        //   mostrarBotaoSalvarEFechar
        //   mostrarBotaoNovo
        //   mostrarBotaoSalvarEFecharCarregando
        //   // mostrarBotaoVoltar={false}
        // />
      }
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={8} lg={4} xl={3}>
              <Card>
                {/* Conteudo */}
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    // Centralizar horizontalmente
                    justifyContent="center"
                    // Centralizar verticalmente
                    alignItems="center"
                  >
                    {!isLoadingPessoas && (
                      <Typography variant="h1">{totalCountPessoas}</Typography>
                    )}
                    {isLoadingPessoas && <CircularProgress />}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8} lg={4} xl={3}>
              <Card>
                {/* Conteudo */}
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de cidades
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    // Centralizar horizontalmente
                    justifyContent="center"
                    // Centralizar verticalmente
                    alignItems="center"
                  >
                    {!isLoadingCidades && (
                      <Typography variant="h1">{totalCountCidades}</Typography>
                    )}
                    {isLoadingCidades && <CircularProgress />}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
