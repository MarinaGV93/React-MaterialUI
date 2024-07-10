import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useForm } from "react-hook-form";

export const DetalheDePessoas: React.FC = () => {
  // Parametro da URL
  const {
    // Se for undefined
    id = "nova",
  } = useParams<"id">(); // Parametro de tipagem
  const navigate = useNavigate();

  // Titulo da Pagina com o nome da pessoa
  const [nome, setNome] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Registrar os campos de formulário
  const {
    register,
    handleSubmit,
    // Erros
    formState: { errors },
    setValue,
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
          // Setar o nome da pessoa
          setNome(result.nomeCompleto);
          setValue("nome", result.nomeCompleto);
          setValue("email", result.email);
          setValue("cidadeId", result.cidadeId);
          console.log(result);
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

  // Pegar as informações do input
  // const addPost = (data: any) => axios.post()

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label>
            <span>Nome</span>
            <br />

            <input
              // Mostrar o erro
              onError={() => console.log("erro")}
              type="text"
              placeholder="Nome Completo"
              // Regristrar o input dentro do useForm, com o 'nome' sendo um objeto
              {...register(
                "nomeCompleto",
                // Regras
                { required: "Nome obrigatório" }
              )}
            />
            {errors?.nomeCompleto && <span>Nome obrigatório</span>}
            <br />
          </label>

          <br />

          <label>
            <span>Email</span>
            <br />

            <input
              type="text"
              placeholder="Email"
              // Regristrar o input dentro do useForm, com a 'email' sendo um objeto
              {...register(
                "email",
                // Regras
                { required: "Email obrigatório" }
              )}
            />
            {errors?.email && <span>Email obrigatório</span>}

            <br />
          </label>

          <br />

          <label>
            <span>Cidade</span>
            <br />

            <input
              type="text"
              placeholder="Cidade Id"
              // Regristrar o input dentro do useForm, com a 'cidadeId' sendo um objeto
              {...register(
                "cidadeId",
                // Regras
                { required: "Cidade obrigatória" }
              )}
            />
            {errors?.cidadeId && <span>Cidade obrigatória</span>}

            <br />
          </label>
        </fieldset>
      </form>
    </LayoutBaseDePagina>
  );
};
