import Container from "@/components/container";
import Link from "next/link";
import TicketItem from "./components/ticket";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: session?.user.id,
      status: "ABERTO",
    },
    include: {
      customer: true,
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            href="/dashboard/new"
            className="bg-blue-500 px-4 py-1 rounded text-white"
          >
            Novo Chamado
          </Link>
        </div>
        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left uppercase pl-1 md:pl-0">
                Cliente
              </th>
              <th className="font-medium text-left uppercase hidden sm:table-cell">
                Data de Cadastro
              </th>
              <th className="font-medium text-left uppercase">Status</th>
              <th className="font-medium text-left uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} customer={ticket.customer} />
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <h2 className="px-2 md:px-0 text-gray-600">Nenhum ticket aberto foi encontrado</h2>
        )}
      </main>
    </Container>
  );
}
