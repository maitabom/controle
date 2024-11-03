import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "O campo de nome é obrigatório"),
  email: z
    .string()
    .email("Digite um e-mail válido")
    .min(1, "O e-mail é obrigatório"),
  address: z.string(),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message: "O número de telefone deve estar no formato correto",
    }
  ),
});


export {schema}