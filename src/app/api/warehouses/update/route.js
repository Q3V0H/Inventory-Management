import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";
import { formatISO } from "date-fns";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, description, location, manager_id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Warehouse ID is required" },
        { status: 400 }
      );
    }

    const warehouse = await prisma.warehouse.findUnique({
      where: { id: parseInt(id) },
    });

    if (!warehouse) {
      return NextResponse.json(
        { message: "warehouse not found" },
        { status: 400 }
      );
    }
    const data = {};

    if (name) {
      data.name = name;
    }

    if (description) {
      data.description = description;
    }

    if (location) {
      data.location = location;
    }

    if (manager_id) {
      data.manager_id = parsint(manager_id);
    }

    const updatedAt = formatISO(new Date(Date.now()));

    const updatedWarehouse = await prisma.warehouse.update({
      where: { id: parseInt(id) },
      data: { ...data, updated_at: updatedAt },
    });

    const result = convertBigIntToString(updatedWarehouse);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
