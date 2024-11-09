"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function handleRegisterTicket(formData: FormData) {
  const session = await getServerSession(authOptions);
  const name = formData.get("name");
  const description = formData.get("description");
  const customerId = formData.get("customer");

  if (!name || !description || !customerId) {
    return;
  }

  await prisma.ticket.create({
    data: {
      name: name as string,
      description: description as string,
      customerId: customerId as string,
      status: "ABERTO",
      userId: session?.user.id,
    },
  });

  redirect("/dashboard");
}
