import { Api } from "../axios-config";

interface IAuth {
  acessToken: string;
}

const auth = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    // Manda os dados junto
    // Seria .post, para enviar os dados para o BACKEND
    const { data } = await Api.get(
      "/auth",
      // Usaria em um cenário real, com o post
      { data: { email, password } }
    );

    if (data) {
      return data;
    }

    return new Error("Erro no login.");
  } catch (e) {
    console.error(e);
    return new Error((e as { message: string }).message || "Erro no login.");
  }
};

export const AuthService = {
  auth,
};
