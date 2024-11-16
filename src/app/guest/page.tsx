"use client";

import { z } from "zod";
import { schema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/input";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { CustomerData } from "./model";
import FormTicket from "./components/form-ticket";
import { api } from "@/lib/api";

type FormData = z.infer<typeof schema>;

export default function GuestTicket() {
  const [customer, setCustomer] = useState<CustomerData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email,
      },
    });

    if (response.data === null) {
      setError("email", {
        type: "custom",
        message: "O cliente não foi encontrado",
      });

      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir Chamado</h1>
      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="bg-slate-200 py-6 px-4 rounded border-2 flex items-center justify-between">
            <p className="text-lg">
              <strong>Cliente selecionado:</strong> {customer.name}
            </p>
            <button
              className="h-11 px-2 flex items-center justify-center rounded"
              onClick={handleClearCustomer}
            >
              <FiX size={24} color="#ff2929" />
            </button>
          </div>
        ) : (
          <form
            className="bg-slate-200 py-6 px-2 rounded border-2"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-3">
              <InputField
                name="email"
                type="email"
                placeholder="Digite o e-mail do cliente"
                error={errors.email?.message}
                register={register}
              />
              <button
                type="submit"
                className="bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center justify-center text-white font-bold rounded"
              >
                <FiSearch size={24} color="#fff" /> Buscar
              </button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket />}
      </main>
    </div>
  );
}
