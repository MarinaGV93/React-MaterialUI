import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo, useState } from "react";
import {
  IListagemPessoa,
  PessoasService,
} from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface IListagemDePessoasProps {
  children: React.ReactNode;
}

export const ListagemDePessoas: React.FC<IListagemDePessoasProps> = () => {
  // ?.... na URL (Atributos Search)
  // Vai dar como resultado uma lista de alguma, com o 1º item = searchParams 2º item = funções para conseguir dar um SET (resgatar os valores do SearchParams)  coisa
  const [searchParams, setSearchParams] = useSearchParams();
  // const { debounce } = useDebounce(3000, false);
  const { debounce } = useDebounce();

  // Linhas da tabela
  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  // Guardar a quantidade total de registros que tem no BD
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    // Buscar o parametro de 'busca' na URL e vai entregar na const 'busca'
    return searchParams.get("busca") || "";
  }, [searchParams]);

  // Só vai ser executado em momentos chave
  useEffect(() => {
    setIsLoading(true);
    // Impedir que as listagens fiquem consultando o backend o tempo todo
    debounce(() => {
      // Reexecutar a consulta para o backend, dando uma resposta, que pode demorar
      PessoasService.getAll(1, busca)
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
            // Result é só pessoas com total count
            console.log(result);

            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });
    });
  }, [busca]);

  return (
    <LayoutBaseDePagina
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
    >
      {isLoading && (
        
      )}
      {/* Div da tabela */}
      <TableContainer
        component={Paper}
        variant="outlined"
        // Style
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          {/* Nomes das colunas */}
          <TableHead>
            {/* Linhas */}
            <TableRow>
              {/* Coluna */}
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          {/* Corpo da tabela */}
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
