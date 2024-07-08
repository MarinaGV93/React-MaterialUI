import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";

export const DetalheDePessoas: React.FC = () => {
  // Parametro da URL
  const {
    // Se for undefined
    id = "nova",
  } = useParams<"id">(); // Parametro de tipagem
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("save");
  };

  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <LayoutBaseDePagina
      titulo="Detalhes da pessoa"
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicaEmApagar={handleDelete}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      <p>Detalhe de pessoa {id}</p>
    </LayoutBaseDePagina>
  );
};
