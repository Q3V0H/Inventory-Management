import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json("Phone no missing", { status: 400 });
    }
    const user = await prisma.members.findUnique({
      where: { phone: phone },
      include: {
        roles: true,
      },
    });

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const result = convertBigIntToString(user);

    return NextResponse.json({ ...result, password: "" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
