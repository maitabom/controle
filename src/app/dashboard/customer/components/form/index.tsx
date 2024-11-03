"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { schema } from "./schema";
import InputField from "@/components/input";
import { api } from "@/lib/api";
import NewCustomerFormProperties from "./properties";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof schema>;

export default function NewCustomerForm({ userId }: NewCustomerFormProperties) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function handleRegister(data: FormData) {
    api
      .post("/api/customer", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        userId: userId,
      })
      .then((response) => {
        router.refresh();
        router.replace("/dashboard/customer");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegister)}
    >
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <InputField
        type="text"
        name="name"
        placeholder="Digite o seu nome completo"
        error={errors.name?.message}
        register={register}
      />
      <section className="flex flex-col sm:flex-row gap-2 my-2">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <InputField
            type="text"
            name="phone"
            placeholder="Digite o seu telefone"
            error={errors.phone?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">E-mail</label>
          <InputField
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>
      <label className="mb-1 text-lg font-medium">Endereço completo</label>
      <InputField
        type="text"
        name="address"
        placeholder="Digite o seu endereço completo"
        error={errors.address?.message}
        register={register}
      />
      <button
        type="submit"
        className="bg-blue-500 my-4 px-4 h-11 rounded text-white font-bold"
      >
        Cadastrar
      </button>
    </form>
  );
}
