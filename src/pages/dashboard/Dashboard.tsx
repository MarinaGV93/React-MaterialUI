import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      barraDeFerramentas={
        // <FerramentasDaListagem
        //   mostrarInputBusca
        //   // textoBotaoNovo="Nova"
        // />
        <FerramentasDeDetalhe
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo
          mostrarBotaoSalvarEFecharCarregando
          // mostrarBotaoVoltar={false}
        />
      }
    >
      Testando
    </LayoutBaseDePagina>
  );
};
