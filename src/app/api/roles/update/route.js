import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";
import { formatISO } from "date-fns";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, description } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Role ID is required" },
        { status: 400 }
      );
    }

    const existingRole = await prisma.roles.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingRole) {
      return NextResponse.json({ message: "Role not found" }, { status: 400 });
    }
    const data = {};

    if (name) {
      data.name = name;
    }

    if (description) {
      data.description = description;
    }

    if (screen) {
      data.screen = screen;
    }

    if (tables) {
      data.tables = tables;
    }

    if (forms) {
      data.forms = forms;
    }

    const updatedAt = formatISO(new Date(Date.now()));

    const role = await prisma.roles.update({
      where: { id: parseInt(id) },
      data: { ...data, updated_at: updatedAt },
    });

    const result = convertBigIntToString(role);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
