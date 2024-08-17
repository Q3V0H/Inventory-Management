import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const role = await prisma.roles.findUnique({
      where: { id: parseInt(id) },
    });

    if (!role) {
      return NextResponse.json({ message: "Role not found" }, { status: 404 });
    }

    await prisma.roles.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: `Role ${role.name} deleted!` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
