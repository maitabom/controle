import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório."),
  description: z.string().min(1, "A descrição do chamado é obrigatório."),
});

export { schema };
