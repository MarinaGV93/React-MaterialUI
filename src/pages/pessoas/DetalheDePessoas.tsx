import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { LinearProgress } from "@mui/material";

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
          console.log(result);
        }
      });
    }
  }, [
    // Array de dependencias
    id,
  ]);

  const handleSave = () => {
    console.log("save");
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
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicaEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}
      <p>Detalhe de pessoa {id}</p>
    </LayoutBaseDePagina>
  );
};
