"use client";

import { FiCheckSquare, FiFile, FiTrash2 } from "react-icons/fi";
import TicketItemProperties from "./properties";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function TicketItem({ ticket, customer }: TicketItemProperties) {
  const router = useRouter();

  async function handleChangeStatus() {
    try {
      const response = api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-gray-200 duration-300">
      <td className="text-left pl-1 md:pl-0">{customer?.name}</td>
      <td className="text-left hidden sm:table-cell">
        {ticket.created_at?.toLocaleDateString("pt-br")}
      </td>
      <td className="text-left">
        <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
      </td>
      <td className="text-right">
        <button className="mr-2" onClick={handleChangeStatus}>
          <FiCheckSquare size={24} color="#131313" />
        </button>
        <button>
          <FiFile size={24} color="#3B82F6" />
        </button>
      </td>
    </tr>
  );
}
