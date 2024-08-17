import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const warehouse = await prisma.warehouse.findUnique({
      where: { id: parseInt(id) },
      include: {
        members: true,
      },
    });

    if (!warehouse) {
      return NextResponse.json(
        { message: "warehouse not found" },
        { status: 404 }
      );
    }

    const result = convertBigIntToString(warehouse);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
