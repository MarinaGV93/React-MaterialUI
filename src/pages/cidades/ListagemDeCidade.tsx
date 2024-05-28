import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useMemo } from "react";

interface IListagemDeCidadeProps {}

export const ListagemDeCidade: React.FC<IListagemDeCidadeProps> = () => {
  // ?.... na URL (Atributos Search)
  // Vai dar como resultado uma lista de alguma, com o 1º item = searchParams 2º item = funções para conseguir dar um SET (resgatar os valores do SearchParams)  coisa
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    // Buscar o parametro de 'busca' na URL e vai entregar na const 'busca'
    return searchParams.get("busca") || "";
  }, [searchParams]);

  return (
    <LayoutBaseDePagina
      children={undefined}
      titulo="Listagem de cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          // Ao digitar, a URL será alterada com o que foi digitado
          // ?? = A mesma coisa que ||
          // textoDaBusca={searchParams.get("busca") ?? ""}
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams(
              { busca: texto },
              // Para nao ficar varias rotas
              { replace: true }
            )
          }
        />
      }
    ></LayoutBaseDePagina>
  );
};
