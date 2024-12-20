import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    if (!email || email === "") {
      return NextResponse.json(
        { error: "Failed to get a customer", details: "Email not receive" },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findFirst({
      where: {
        email: email,
      },
    });

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get a customer", details: error },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address: address || "",
        userId,
      },
    });

    return NextResponse.json(
      { message: "Customer has been create sucessful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create new customer", details: error },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("id");

  if (!customerId) {
    return NextResponse.json({ error: "Request invalid" }, { status: 400 });
  }

  const ticketsPivot = await prisma.ticket.findFirst({
    where: {
      customerId: customerId,
    },
  });

  if (ticketsPivot) {
    return NextResponse.json(
      { error: "Operation not allowed" },
      { status: 406 }
    );
  }

  try {
    await prisma.customer.delete({
      where: {
        id: customerId,
      },
    });

    return NextResponse.json(
      { message: "Customer has been delete sucessful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete customer", details: error },
      { status: 400 }
    );
  }
}
