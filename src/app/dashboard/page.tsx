import Container from "@/components/container";
import Link from "next/link";
import TicketItem from "./components/ticket";

export default function Dashboard() {
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
            <TicketItem />
          </tbody>
        </table>
      </main>
    </Container>
  );
}
