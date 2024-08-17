import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { hash } from "bcrypt";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, phone, password, role_id, location } = body;

    if (!name || !email || !phone || !password || !role_id) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    const role = await prisma.roles.findUnique({
      where: { id: parseInt(role_id) },
    });

    if (!role) {
      return NextResponse.json({ message: "Role not found" }, { status: 400 });
    }

    const hashedPass = await hash(password, 10);

    const user = await prisma.members.create({
      data: {
        name,
        email,
        phone,
        password: hashedPass,
        role_id: parseInt(role_id),
        location,
      },
    });

    const result = convertBigIntToString(user);

    return NextResponse.json(
      { result },
      { message: "User added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
