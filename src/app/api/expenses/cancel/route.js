import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    const expense = await prisma.expenses.findUnique.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!expense) {
      return NextResponse.json(
        { message: "Expense not found" },
        { status: 400 }
      );
    }

    const updatedExpense = await prisma.expenses.update({
      where: { id: parseInt(id) },
      data: {
        status: "cancelled",
      },
    });

    const result = convertBigIntToString(updatedExpense);

    return NextResponse.json(
      {
        result,
        server_message: "Expense cancelled successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
