import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, amount } = body;

    if (!name || !amount) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    const expense = await prisma.expenses.create({
      data: {
        name,
        amount,
        status: "pending",
      },
    });

    const result = convertBigIntToString(expense);

    return NextResponse.json(
      {
        result,
        server_message: "Expense Added successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
