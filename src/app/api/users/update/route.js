import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { hash } from "bcrypt";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function PUT(req) {
  try {
    const body = await req.json();

    const { id, name, email, phone, role_id, location } = body;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const member = await prisma.members.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!member) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    if (role_id) {
      const role = await prisma.roles.findUnique({
        where: { id: parseInt(role_id) },
      });

      if (!role) {
        return NextResponse.json(
          { message: "Role not found" },
          { status: 400 }
        );
      }
    }

    const user = await prisma.members.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phone,
        role_id: parseInt(role_id),
        location,
      },
    });

    const result = convertBigIntToString(user);

    return NextResponse.json(
      { ...result, password: "" },
      { message: "User updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
