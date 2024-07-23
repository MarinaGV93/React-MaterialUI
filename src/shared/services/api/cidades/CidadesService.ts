// Tem o GET ALL, GET BY ID, CREATE, UPDATE BY ID e DELETE BY ID

import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemCidade {
  id: number;
  nome: string;
}

export interface IDetalheCidade {
  id: number;
  nome: string;
}

// Da listagem de cidades com a quantidade total que existe no banco de dados
// Tipar os dados

export type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
};

/**
 * Consulta dos registros
 */
// Async:  assincrona = pode demorar
// Pode retornar uma lista de cidades ou um error
const getAll = async (
  page = 1,
  filter = ""
): Promise<TCidadesComTotalCount | Error> => {
  // Consulta o BACKEND. Pode demorar para acontecer a chamada.
  try {
    // Para o page ser dinâmico
    // _like = buscar dados personalizados ('titulo especifico')
    const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;

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
      (e as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

/**
 * Consulta do registro
 */
const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.get(`/cidades/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (e) {
    console.error(e);
    return new Error(
      (e as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

/**
 * Criar registro
 */
// Omit = esconder algum atributo (id)
const create = async (
  dados: Omit<IDetalheCidade, "id">
): Promise<number | Error> => {
  try {
    // post = envia dados pro BACKEND <dizendo qual o tipo do dado>
    // Manda os dados junto
    const { data } = await Api.post<IDetalheCidade>("/cidades", dados);

    if (data) {
      // A resposta sera sempre o ID que foi criado
      return data.id;
    }

    return new Error("Erro ao criar o registro");
  } catch (e) {
    console.error(e);
    return new Error(
      (e as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

/**
 * Atualizar o registro
 */
// void = retornar nada
const updateById = async (
  id: number,
  dados: IDetalheCidade
): Promise<void | Error> => {
  try {
    // put= atualizar
    await Api.put(`/cidades/${id}`, dados);
  } catch (e) {
    console.error(e);
    return new Error(
      (e as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

/**
 * Apagar o registro
 */
const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);
  } catch (e) {
    console.error(e);
    return new Error(
      (e as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

// SERVICE
// Criar metodos e tratar (como a tipagem)

export const CidadesService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
