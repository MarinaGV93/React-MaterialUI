// Erro

import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  // Traz o porque o campo esta errado
  // error.response.data

  // Sem conexão
  if (error.message === "Network Error") {
    // Retorna uma mensagem
    return Promise.reject(new Error("Erro de conexão."));
  }
  if (error.response?.status === 401) {
    // Retorna uma mensagem
  }

  // Retorna o erro
  return Promise.reject(error);
};
