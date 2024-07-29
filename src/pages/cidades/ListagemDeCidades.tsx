import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo, useState } from "react";
import {
  IListagemCidade,
  CidadesService,
} from "../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../shared/hooks";
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Environment } from "../../shared/environment";

export const ListagemDeCidades: React.FC = () => {
  // ?.... na URL (Atributos Search)
  // Vai dar como resultado uma lista de alguma, com o 1º item = searchParams 2º item = funções para conseguir dar um SET (resgatar os valores do SearchParams)  coisa
  const [searchParams, setSearchParams] = useSearchParams();

  // const { debounce } = useDebounce(3000, false);
  const { debounce } = useDebounce();

  // Navegacao da paginacao
  const navigate = useNavigate();

  // Linhas da tabela
  const [rows, setRows] = useState<IListagemCidade[]>([]);

  // Guardar a quantidade total de registros que tem no BD
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const busca = useMemo(() => {
    // Buscar o parametro de 'busca' na URL e vai entregar na const 'busca'
    return searchParams.get("busca") || "";
  }, [searchParams]);

  // Saber em que pagina esta
  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  // Só vai ser executado em momentos chave
  useEffect(() => {
    setIsLoading(true);

    // Impedir que as listagens fiquem consultando o backend o tempo todo
    debounce(() => {
      // Reexecutar a consulta para o backend, dando uma resposta, que pode demorar
      CidadesService.getAll(pagina, busca)

        // Quando retornar
        // Pega o result
        .then((result) => {
          setIsLoading(false);

          // Mostrar na tela
          // Se for uma instancia de Erro. Deu erro na hora de consultar os registros no BD?
          if (result instanceof Error) {
            // Result é só erro
            alert(result.message);
          } else {
            // Result é só cidades com total count
            console.log(result);

            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });
    });
  }, [busca, pagina]);

  // Apagar o registro
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
              // Remover o registro da listagem
              setRows(
                // State anterior
                (oldRows) => [
                  // Spread (operador de espalhamento) permite que um objeto seja expandido em vários elementos individuais
                  ...oldRows
                    // Filtrar um registro
                    .filter(
                      // Predicate = que vai retornar um booleano dizendo se vai continuar ou nao o registro
                      (oldRow) =>
                        // Todas as linhas que o id é diferente do id que foi passado
                        oldRow.id !== id
                    ),
                ]
              );
              alert("Registro apagado com sucesso");
            }
          });
      }
    };

  return (
    <LayoutBaseDePagina
      titulo="Listagem de cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          // Ao digitar, a URL será alterada com o que foi digitado
          // ?? = A mesma coisa que ||
          // textoDaBusca={searchParams.get("busca") ?? ""}
          textoDaBusca={busca}
          textoBotaoNovo="Nova"
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams(
              { busca: texto, pagina: "1" },

              // Para nao ficar varias rotas
              { replace: true }
            )
          }
          aoClicarBotaoNovo={() => navigate("/cidades/detalhe/nova")}
        />
      }
    >
      {/* Div da tabela */}
      <TableContainer
        component={Paper}
        variant="outlined"
        // Estilo
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          {/* Nomes das colunas */}
          <TableHead>
            {/* Linhas */}
            <TableRow>
              {/* Coluna */}
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>

          {/* Corpo da tabela */}
          <TableBody>
            {/* Cada linha retorna um table row */}
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {/* Botões de ações de cada linha */}
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/cidades/detalhe/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          {/* Rodapé */}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell
                  // Quantas colunas irá oculpar
                  colSpan={3}
                >
                  {/* Progresso Linear */}
                  <LinearProgress
                    // Indeterminado
                    variant="indeterminate"
                  />
                </TableCell>
              </TableRow>
            )}

            {/* TODO: Arrumar a logica de paginação de cidades **/}

            {totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    // Qual a pagina atual
                    // page={pagina}

                    // Quantidade de páginas
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { busca, pagina: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
