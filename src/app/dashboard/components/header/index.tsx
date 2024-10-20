import Container from "@/components/container";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 items-center">
        <Link href="/dashboard" className="text-white hover:font-bold duration-300">
          Lista de Chamados
        </Link>
        <Link href="/dashboard/customer" className="text-white hover:font-bold duration-300">
          Lista de Clientes
        </Link>
      </header>
    </Container>
  );
}
