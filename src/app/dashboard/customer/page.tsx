import Container from "@/components/container";
import Link from "next/link";
import CardCustomer from "./components/card";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardCustomer() {
  const session = await getServerSession(authOptions);
  const customers = await prisma.customer.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <Container>
      <div className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Novo Cliente
          </Link>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
          {customers.map((customer) => (
            <CardCustomer key={customer.id} customer={customer} />
          ))}
        </section>
      </div>
    </Container>
  );
}
