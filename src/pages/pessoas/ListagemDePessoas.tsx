import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas: React.FC = () => {
  // ?.... na URL (Atributos Search)
  // Vai dar como resultado uma lista de alguma, com o 1º item = searchParams 2º item = funções para conseguir dar um SET (resgatar os valores do SearchParams)  coisa
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    // Buscar o parametro de 'busca' na URL e vai entregar na const 'busca'
    return searchParams.get("busca") || "";
  }, [searchParams]);

  // Só vai ser executado em momentos chave
  useEffect(() => {
    // Rexecutar a consulta para o backend, dando uma resposta, que pode demorar
    PessoasService.getAll(1, busca)
      // Quando retornar
      // Pega o result
      .then((result) => {
        // Mostrar na tela
        // Se for uma instancia de Erro. Deu erro na hora de consultar os registros no BD?
        if (result instanceof Error) {
          // Result é só erro
          alert(result.message);
        } else {
          // Result é só pessoas com total count
          console.log(result);
        }
      });
  }, [busca]);

  return (
    <LayoutBaseDePagina
      children={undefined}
      titulo="Listagem de pessoas"
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
