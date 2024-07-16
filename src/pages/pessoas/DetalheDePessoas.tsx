import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Form, useForm } from "react-hook-form";
import {
  Box,
  Grid,
  Input,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export const DetalheDePessoas: React.FC = () => {
  // Parametro da URL
  const {
    // Se for undefined
    id = "nova",
  } = useParams<"id">(); // Parametro de tipagem
  const navigate = useNavigate();

  // Titulo da Pagina com o nome da pessoa
  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [cidadeId, setCidadeId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Registrar os campos de formulário
  const {
    register,
    handleSubmit,
    // Erros
    formState: { errors },
    setValue,
    control,
  } = useForm();
  // Mostra os campos de erro
  console.log(errors);

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      // Consulta no backend
      PessoasService.getById(
        // Converter para Number
        Number(id)
      ).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          // Alert = tranca a fila de execução
          alert(result.message);
          navigate("/pessoas");
        } else {
          // Setar os dados da pessoa
          setNome(result.nomeCompleto);
          setEmail(result.email);
          setCidadeId(result.cidadeId.toString());
        }
      });
    }
  }, [
    // Array de dependencias
    id,
    // navigate,
  ]);

  const onSubmit = (dados: any) => {
    setIsLoading(true);

    if (id === "nova") {
      // Cria um novo registro
      PessoasService.create(dados).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          // Abrir a tela do novo registro
          setNome(`${dados.nomeCompleto}`);
          navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      // Atualizar o registro
      PessoasService.updateById(Number(id), dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        }
      });
    }
  };

  const handleDelete =
    // Busca o id da pessoa
    (id: number) => {
      if (
        // Como se fosse um alert, retornando um true ou false

        // Desativar a regra para a variável confirm
        // eslint-disable-next-line no-restricted-globals
        confirm("Realmente deseja apagar?")
      ) {
        PessoasService.deleteById(id)

          // Quando acontecer a promessa
          .then((result) => {
            if (result instanceof Error) {
              alert(result.message);
            } else {
              alert("Registro apagado com sucesso");
              navigate("/pessoas");
            }
          });
      }
    };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoClicarEmSalvar={() => handleSubmit(onSubmit)()}
          aoClicarEmSalvarEFechar={() => handleSubmit(onSubmit)()}
          aoClicaEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      <Form onSubmit={onSubmit} control={control}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
          border="none"
        >
          {/* Quando tiver mais de 1 grid dentro, será um container */}
          <Grid container direction={"column"} padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            {/* Como se fosse uma linha */}
            <Grid container item direction="row" spacing={2}>
              {/* Item dentro da linha */}
              <Grid
                item
                // Menor tamanho da tela
                // Quando a tela for maior que 0px
                xs={12}
                // Tamanho pequeno da tela
                // Quando a tela for maior que 600px
                sm={12}
                // Tamanho médio da tela
                // Quando a tela for maior que 900px
                md={6}
                // Tamanho grande da tela
                // Quando a tela for maior que 1200px
                lg={4}
                // Maior tamanho da tela
                // Quando a tela for maior que 1536px
                xl={2}
              >
                <TextField
                  fullWidth
                  // Mostrar o erro
                  onError={() => console.log("erro")}
                  type="text"
                  label="Nome Completo"
                  // Regristrar dentro do useForm, com o 'nome' sendo um objeto
                  {...register(
                    "nomeCompleto",
                    // Regras
                    { required: "Nome obrigatório" }
                  )}
                  value={nome}
                  onChange={(
                    // Evento
                    e
                  ) => setNome(e.target.value)}
                  disabled={isLoading}
                />
                {errors?.nomeCompleto && <span>Nome obrigatório</span>}
              </Grid>
            </Grid>

            {/* Como se fosse uma linha */}
            <Grid container item direction="row" spacing={2}>
              {/* Item dentro da linha */}
              <Grid
                item
                // Menor tamanho da tela
                // Quando a tela for maior que 0px
                xs={12}
                // Tamanho pequeno da tela
                // Quando a tela for maior que 600px
                sm={12}
                // Tamanho médio da tela
                // Quando a tela for maior que 900px
                md={6}
                // Tamanho grande da tela
                // Quando a tela for maior que 1200px
                lg={4}
                // Maior tamanho da tela
                // Quando a tela for maior que 1536px
                xl={2}
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Email"
                  // Regristrar dentro do useForm, com a 'email' sendo um objeto
                  {...register(
                    "email",
                    // Regras
                    { required: "Email obrigatório" }
                  )}
                  value={email}
                  disabled={isLoading}
                />
                {errors?.email && <span>Email obrigatório</span>}
              </Grid>
            </Grid>

            {/* Como se fosse uma linha */}
            <Grid container item direction="row" spacing={2}>
              {/* Item dentro da linha */}
              <Grid
                item
                // Menor tamanho da tela
                // Quando a tela for maior que 0px
                xs={12}
                // Tamanho pequeno da tela
                // Quando a tela for maior que 600px
                sm={12}
                // Tamanho médio da tela
                // Quando a tela for maior que 900px
                md={6}
                // Tamanho grande da tela
                // Quando a tela for maior que 1200px
                lg={4}
                // Maior tamanho da tela
                // Quando a tela for maior que 1536px
                xl={2}
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Cidade"
                  // Regristrar dentro do useForm, com a 'cidadeId' sendo um objeto
                  {...register(
                    "cidadeId",
                    // Regras
                    { required: "Cidade obrigatória" }
                  )}
                  value={cidadeId}
                  disabled={isLoading}
                />
                {errors?.cidadeId && <span>Cidade obrigatória</span>}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBaseDePagina>
  );
};
