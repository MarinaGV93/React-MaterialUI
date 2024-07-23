import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { Form, useForm } from "react-hook-form";
import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";

interface IFormData {
  nome: string;
}

//  Esquema de validação
const formValidationSchema: yup.Schema<IFormData> = yup
  // Objetos
  .object()
  // Todos os atributos que terá dentro do objeto que vai mandar para o backend
  .shape({
    nome: yup
      // Texto
      .string()
      // Obrigatório
      .required("Nome obrigatório")
      // Mínimo de 3 caracteres
      .min(3, "O nome deve conter pelo menos 3 caracteres"),
  });

export const DetalheDeCidades: React.FC = () => {
  // Parametro da URL
  const {
    // Se for undefined
    id = "nova",
  } = useParams<"id">(); // Parametro de tipagem
  const navigate = useNavigate();

  // Titulo da Pagina com o nome da cidade
  const [nome, setNome] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [close, setClose] = useState(false);

  // Registrar os campos de formulário
  const {
    register,
    handleSubmit,
    // Erros
    formState: { errors },
    control,
    setError,
  } = useForm();
  // Mostra os campos de erro
  console.log(errors);

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      // Consulta no backend
      CidadesService.getById(
        // Converter para Number
        Number(id)
      ).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          // Alert = tranca a fila de execução
          alert(result.message);
          navigate("/cidades");
        } else {
          // Setar os dados da cidade
          setNome(result.nome);
        }
      });
    } else {
      setNome("");
    }
  }, [
    // Array de dependencias
    id,
  ]);

  const onSubmit = (dados: any) => {
    // Validar os dados
    formValidationSchema
      .validate(
        dados,
        // Valida todos os campos e mostra os erros para todos
        { abortEarly: false }
      )
      // Se der tudo certo
      .then(
        (
          // Recebe os dados validados (valor padrao se o campo tiver em branco)
          dadosValidados
        ) => {
          setIsLoading(true);

          if (id === "nova") {
            // Cria um novo registro
            CidadesService.create(dadosValidados).then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (!close) {
                  navigate("/cidades");
                } else {
                  // Abrir a tela do novo registro
                  setNome(`${dados.nome}`);
                  navigate(`/cidades/detalhe/${result}`);
                }
              }
            });
          } else {
            // Atualizar o registro
            CidadesService.updateById(Number(id), {
              id: Number(id),
              ...dadosValidados,
            }).then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (!close) {
                  navigate("/cidades");
                }
              }
            });
          }
        }
      )
      // Se der errado
      .catch((errors: yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        setError("dados", {
          type: "validation",
        });
      });
  };

  const handleDelete =
    // Busca o id da cidade
    (id: number) => {
      if (
        // Como se fosse um alert, retornando um true ou false

        // Desativar a regra para a variável confirm
        // eslint-disable-next-line no-restricted-globals
        confirm("Realmente deseja apagar?")
      ) {
        CidadesService.deleteById(id)

          // Quando acontecer a promessa
          .then((result) => {
            if (result instanceof Error) {
              alert(result.message);
            } else {
              alert("Registro apagado com sucesso");
              navigate("/cidades");
            }
          });
      }
    };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova cidade" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoClicarEmSalvar={() => handleSubmit(onSubmit)()}
          aoClicarEmSalvarEFechar={() => handleSubmit(onSubmit)()}
          aoClicaEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/cidades")}
          aoClicarEmNovo={() => navigate("/cidades/detalhe/nova")}
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
                  label="Nome"
                  // Regristrar dentro do useForm, com o 'nome' sendo um objeto
                  {...register("nome", {
                    required: "Nome",
                  })}
                  value={nome}
                  onChange={(
                    // Evento
                    e
                  ) => setNome(e.target.value)}
                  disabled={isLoading}
                />
                {errors?.nomeCompleto && (
                  <Typography color="error">Nome obrigatório</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBaseDePagina>
  );
};
