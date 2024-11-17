"use client";

import InputField from "@/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import FormTicketProperties from "./properties";

type FormData = z.infer<typeof schema>;

export default function FormTicket({ customer }: FormTicketProperties) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    const response = await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customer: customer.id,
    });

    setValue("name", "");
    setValue("description", "");
  }

  return (
    <form
      className="bg-slate-200 mt-6 px-4 py-5 rounded border-2"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label className="mb-1 font-medium text-lg">Nome do chamado:</label>
      <InputField
        register={register}
        type="text"
        placeholder="Digite o nome do chamado"
        name="name"
        error={errors.name?.message}
      />

      <label className="mb-1 font-medium text-lg">Descreva o chamado:</label>
      <textarea
        className="w-full border-2 rounded-md h-24 resize-none px-2"
        placeholder="Descreva o seu problema"
        id="description"
        {...register("description")}
      />
      {errors.description?.message && (
        <p className="text-red-500 my-1">{errors.description.message}</p>
      )}
      <button
        className="bg-blue-500 rounded-md w-full h-11 mt-2 px-2 text-white font-bold"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
}
