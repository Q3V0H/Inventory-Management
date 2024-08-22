import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, approved_by } = body;

    if (!id || !approved_by) {
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
        approved_by: parseInt(approved_by),
        status: "approved",
      },
    });

    const result = convertBigIntToString(updatedExpense);

    return NextResponse.json(
      {
        result,
        server_message: "Expense Approved successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
