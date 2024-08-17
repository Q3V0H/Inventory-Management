import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      quantity,
      description,
      price,
      warehouse_id,
      unit_of_measure,
      category,
    } = body;

    if (
      !name ||
      !quantity ||
      !price ||
      !warehouse_id ||
      !unit_of_measure ||
      !category ||
      !description
    ) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    const warehouse = await prisma.warehouse.findUnique({
      where: { id: parseInt(warehouse_id) },
    });

    if (!warehouse) {
      return NextResponse.json(
        { message: "Warehouse not found" },
        { status: 400 }
      );
    }

    const product = await prisma.products.create({
      data: {
        name,
        quantity,
        description,
        price,
        warehouse_id,
        unit_of_measure,
        category,
      },
    });

    const result = convertBigIntToString(product);

    return NextResponse.json(
      {
        result,
        server_message: "Product Added successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
