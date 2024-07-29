import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Environment } from "../../../environment";

// Criar instancias padroes passando as configurações
const Api = axios.create({
  baseURL: Environment.URL_BASE,
  // Mandar em cada requisição o token de autenticação
  // headers: {
  //   Authorization: `Bearer ${JSON.parse(
  //     localStorage.getItem("APP_ACCESS_TOKEN") || ""
  //   )}`,
  // },
});

// interceptors (interceptadores):  interceptar solicitações ou respostas antes que elas sejam tratadas
// Vincular com o axios
// Passa o de sucesso/Passa o de erro
Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

// Deixa disponivel para que em qualquer lugar para poder importar o API
export { Api };
