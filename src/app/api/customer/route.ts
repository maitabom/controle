import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = request.json();

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
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create new user" },
      { status: 400 }
    );
  }
}
