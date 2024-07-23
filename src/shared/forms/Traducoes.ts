import { setLocale } from "yup";

setLocale({
  mixed: {
    default: "Campo inválido",
    required: "Este campo é obrigatório",
  },
  string: {
    email: () => "Email inválido",
    max: ({ max }) => `O valor deve ter no máximo ${max} caracteres`,
    min: ({ min }) => `O valor deve ter pelo menos ${min} caracteres`,
    length: ({ length }) => `O valor deve ter exatamente ${length} caracteres`,
  },
  date: {
    max: ({ max }) => `A data deve ser maior que ${max}`,
    min: ({ min }) => `A data deve ser menor que ${min}`,
  },
  number: {
    integer: () => "O valor deve ser um número inteiro",
    negative: () => "O valor deve ser um número negativo",
    positive: () => "O valor deve ser um número positivo",
    moreThan: ({ more }) => `O valor deve ser maior que ${more}`,
    lessThan: ({ less }) => `O valor deve ser menor que ${less}`,
    max: ({ max }) => `O valor deve ser menor que ${max}`,
    min: ({ min }) => `O valor deve ser maior que ${min}`,
  },
  boolean: {},
  object: {},
  array: {},
});
