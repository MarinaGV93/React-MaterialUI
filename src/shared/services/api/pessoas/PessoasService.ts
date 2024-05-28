// Tem o GET ALL, GET BY ID, CREATE, UPDATE BY ID e DELETE BY ID

import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface IListagemPessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
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

/**
 * Consulta do registro
 */
const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro");
  } catch (e) {
    console.error(e);
    return new Error(
      (e as { message: string }).message || "Erro ao consultar o registro"
    );
  }
};

/**
 * Criar registro
 */
// Omit = esconder algum atributo (id)
const create = async (
  dados: Omit<IDetalhePessoa, "id">
): Promise<number | Error> => {
  try {
    // post = envia dados pro BACKEND <dizendo qual o tipo do dado>
    // Manda os dados junto
    const { data } = await Api.post<IDetalhePessoa>("/pessoas", dados);

    if (data) {
      // A resposta sera sempre o ID que foi criado
      return data.id;
    }

    return new Error("Erro ao criar o registro");
  } catch (e) {
    console.error(e);
    return new Error(
      (e as { message: string }).message || "Erro ao criar o registro"
    );
  }
};

/**
 * Atualizar o registro
 */
// void = retornar nada
const updateById = async (
  id: number,
  dados: IDetalhePessoa
): Promise<void | Error> => {
  try {
    // put= atualizar
    await Api.put(`/pessoas/${id}`, dados);
  } catch (e) {
    console.error(e);
    return new Error(
      (e as { message: string }).message || "Erro ao atualizar o registro"
    );
  }
};

/**
 * Apagar o registro
 */
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch (e) {
    console.error(e);
    return new Error(
      (e as { message: string }).message || "Erro ao apagar o registro"
    );
  }
};

// SERVICE
// Criar metodos e tratar (como a tipagem)

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
