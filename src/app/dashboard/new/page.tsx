import Container from "@/components/container";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { handleRegisterTicket } from "./actions";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  const customers = await prisma.customer.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <Container>
      <div className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>
        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label htmlFor="name" className="mb-1 font-medium text-lg">
            Nome do chamado
          </label>
          <input
            name="name"
            type="text"
            placeholder="Digite o nome do chamado"
            required
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
          />
          <label htmlFor="description" className="mb-1 font-medium text-lg">
            Descreva o problema
          </label>
          <textarea
            name="description"
            placeholder="Descreva o problema"
            required
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
          />

          {customers.length > 0 && (
            <>
              <label className="mb-1 font-medium text-lg" htmlFor="customer">
                Cliente
              </label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white"
                name="customer"
              >
                <option value=""></option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Você ainda não tem nenhum cliente. Clique aqui para cadastrar um
              novo cliente
            </Link>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}
