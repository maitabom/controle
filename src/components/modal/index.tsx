"use client";

import { ModalContext } from "@/providers/modal";
import { useContext, useRef, MouseEvent } from "react";

export default function ModalTicket() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <div
      className="absolute bg-gray-900/70 w-full min-h-screen"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-lg md:text-2xl">
              Detalhes do Chamado
            </h1>
            <button
              className="bg-red-500 py-1 px-2 text-white rounded"
              onClick={() => handleModalVisible()}
            >
              Fechar
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h4 className="font-bold">Nome:</h4>
            <p>{ticket?.ticket.name}</p>
          </div>

          <div className="flex flex-wrap flex-col gap-1 mb-2">
            <h4 className="font-bold">Descrição:</h4>
            <p>{ticket?.ticket.description}</p>
          </div>

          <div className="w-full border-b-2 my-4"></div>

          <h1 className="font-bold text-lg mb-4">Detalhes do Cliente</h1>
          <div className="flex flex-wrap gap-1 mb-2">
            <h4 className="font-bold">Nome:</h4>
            <p>{ticket?.customer?.name}</p>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h4 className="font-bold">Telefone:</h4>
            <p>{ticket?.customer?.phone}</p>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <h4 className="font-bold">E-mail:</h4>
            <p>{ticket?.customer?.email}</p>
          </div>
          {ticket?.customer?.address && (
            <div className="flex flex-wrap gap-1 mb-2">
              <h4 className="font-bold">Endereço:</h4>
              <p>{ticket.customer.address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
