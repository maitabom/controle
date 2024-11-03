"use client";

import { api } from "@/lib/api";
import CardCustomerProperties from "./properties";
import { useRouter } from "next/navigation";

export default function CardCustomer({ customer }: CardCustomerProperties) {
  const router = useRouter()

  async function handleDeleteCustomer() {
    await api
      .delete("/api/customer", {
        params: {
          id: customer.id,
        },
      })
      .then(response => {
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2">
      <h2>
        <a href="#" className="font-bold text-2x">
          {customer.name}
        </a>
      </h2>
      <p>
        <strong>E-mail:</strong>&nbsp;{customer.email}
      </p>
      <p>
        <strong>Telefone:</strong>&nbsp;{customer.phone}
      </p>
      <button
        type="button"
        className="bg-red-500 px-4 rounded text-white mt-2 self-end"
        onClick={handleDeleteCustomer}
      >
        Excluir
      </button>
    </article>
  );
}
