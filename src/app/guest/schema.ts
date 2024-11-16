import { z } from "zod";

const schema = z.object({
  email: z.string().email("Digite o e-mail do cliente para localizar.").min(1, "O campo e-mail é obrigatório"),
});

export { schema };
