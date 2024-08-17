import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const warehouse = await prisma.warehouse.findUnique({
      where: { id: parseInt(id) },
    });

    if (!warehouse) {
      return NextResponse.json({ message: "warehouse not found" }, { status: 404 });
    }

    await prisma.warehouse.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: `Warehouse ${warehouse.name} deleted!` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
