// Sucesso

import { AxiosResponse } from "axios";

export const responseInterceptor = (response: AxiosResponse) => {
  // Reemcaminhando
  return response;
};
