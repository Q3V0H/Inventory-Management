import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Role name is required" },
        { status: 400 }
      );
    }

    const existingRole = await prisma.roles.findUnique({
      where: { name },
    });

    if (existingRole) {
      return NextResponse.json(
        { message: "Role with this name already exists" },
        { status: 400 }
      );
    }

    const role = await prisma.roles.create({
      data: {
        name,
        description,
      },
    });

    const result = convertBigIntToString(role);

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
