import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { customer, name, description } = await request.json();

  try {
    if (!customer || !name || !description) {
      return NextResponse.json(
        {
          error: "Failed create new ticket",
          details: "Missing a required field data",
        },
        { status: 406 }
      );
    }

    await prisma.ticket.create({
      data: {
        name: name,
        description: description,
        status: "ABERTO",
        customerId: customer,
      },
    });

    return NextResponse.json(
      {
        message: "Chamado registrado com sucesso",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed create new ticket", details: error },
      { status: 406 }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  const { id } = await request.json();
  const findTicket = await prisma.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return NextResponse.json(
      { error: "Failed updated ticket" },
      { status: 406 }
    );
  }

  try {
    await prisma.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json(
      { message: "Ticket has been updated successfuly" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed updated ticket", details: error },
      { status: 406 }
    );
  }
}
