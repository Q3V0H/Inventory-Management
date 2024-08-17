import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, manager_id, location } = body;

    if (!name || !location) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    if (manager_id) {
      const member = await prisma.members.findUnique({
        where: { id: parseInt(manager_id), role_id: parseInt(2) },
      });

      if (!member) {
        return NextResponse.json(
          { message: "Manager not found or member not a warehouse manager" },
          { status: 500 }
        );
      }
    }

    const warehouse = await prisma.warehouse.create({
      data: {
        name,
        description,
        location,
        manager_id: parseInt(manager_id) || null,
      },
    });

    const result = convertBigIntToString(warehouse);

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
