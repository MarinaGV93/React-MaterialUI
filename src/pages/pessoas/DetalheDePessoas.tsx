import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
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
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

//  Esquema de validação
const formValidationSchema: yup.Schema<IFormData> = yup
  // Objetos
  .object()
  // Todos os atributos que terá dentro do objeto que vai mandar para o backend
  .shape({
    cidadeId: yup
      // Numero
      .number()
      .required("Cidade obrigatória"),
    email: yup
      .string()
      .required("Email obrigatório")
      // Email deve ter um formato correto
      .email(),
    nomeCompleto: yup
      // Texto
      .string()
      // Obrigatório
      .required("Nome obrigatório")
      // Mínimo de 3 caracteres
      .min(3, "O nome deve conter pelo menos 3 caracteres"),
  });

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
    } else {
      setNome("");
      setEmail("");
      setCidadeId("");
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
            PessoasService.create(dadosValidados).then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (!close) {
                  navigate("/pessoas");
                } else {
                  // Abrir a tela do novo registro
                  setNome(`${dados.nomeCompleto}`);
                  navigate(`/pessoas/detalhe/${result}`);
                }
              }
            });
          } else {
            // Atualizar o registro
            PessoasService.updateById(Number(id), {
              id: Number(id),
              ...dadosValidados,
            }).then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (!close) {
                  navigate("/pessoas");
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
                  {...register("nomeCompleto", {
                    required: "Nome obrigatório",
                  })}
                  value={nome}
                  onChange={(
                    // Evento
                    e
                  ) => setNome(e.target.value)}
                  disabled={isLoading}
                />
                {errors?.nomeCompleto && (
                  <Typography color="error">
                    Nome completo obrigatório
                  </Typography>
                )}
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
                  {...register("email", {
                    required: "Email obrigatório",
                  })}
                  value={email}
                  onChange={(
                    // Evento
                    e
                  ) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                {errors?.email && (
                  <Typography color="error">Email obrigatório</Typography>
                )}
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
                  {...register("cidadeId", {
                    required: "Cidade obrigatória",
                  })}
                  value={cidadeId}
                  onChange={(
                    // Evento
                    e
                  ) => setCidadeId(e.target.value)}
                  disabled={isLoading}
                />
                {errors?.cidadeId && (
                  <Typography color="error">Cidade obrigatória</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBaseDePagina>
  );
};
