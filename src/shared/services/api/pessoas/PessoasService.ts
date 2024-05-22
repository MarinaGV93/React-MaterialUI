// Tem o GET ALL, GET BY ID, CREATE, UPDATE BY ID e DELETE BY ID

import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface IListagemPessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

interface IDetalhePessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

// Da listagem de pessoas com a quantidade total que existe no banco de dados
// Tipar os dados

type IPessosComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};

/**
 * Consulta dos registros
 */
// Async:  assincrona = pode demorar
// Pode retornar uma lista de pessoas ou um error
const getAll = async (
  page = 1,
  filter = ""
): Promise<IPessosComTotalCount | Error> => {
  // Consulta o BACKEND. Pode demorar para acontecer a chamada.
  try {
    // Para o page ser dinâmico
    // _like = buscar dados personalizados ('titulo especifico')
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

    // Desestruturaçao
    // Passar a url relativa
    // get é uma promisse (promessa). Retornar na hora
    // data = o que o BACKEND responder. Os dados retornados
    // await = esperar
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        // Converter para numerico
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }

    return new Error("Erro ao listar os registros");
  } catch (e) {
    // Já ira mostrar o erro no terminal
    console.error(e);
    // Se der erro
    return new Error(
      // Irá pegar a msg do erro
      (e as { message: string }).message || "Erro ao listar os registros"
    );
  }
};
// Trazer alguns registros
const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

// SERVICE
// Criar metodos e tratar (como a tipagem)

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
