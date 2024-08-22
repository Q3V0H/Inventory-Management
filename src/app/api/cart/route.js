import { NextResponse } from "next/server";
import { formatOrder, inFilter } from "../_components/utils/list";
import { convertBigIntToString } from "../_components/utils/convertBigint";
import { prisma } from "../_components/Prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;
    const order = searchParams.get("order") || "desc";
    const user_id = searchParams.get("user_id");

    const whereDoc = {};

    const orderBy = formatOrder(order);

    inFilter({
      whereDoc,
      field: "user_id",
      filter: user_id,
    });

    const total = await prisma.customer_order_product.count({
      where: whereDoc,
    });
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const pageCount = Math.ceil(total / pageLimit);

    const offset = pageNumber > 1 ? pageNumber * pageLimit - pageLimit : 0;

    const items = await prisma.customer_order_product.findMany({
      where: whereDoc,
      orderBy: orderBy,
      skip: offset,
      take: pageLimit,
      include: {
        customer_order: true,
      },
    });

    const pagination = {
      pagination: {
        total,
        total_docs: items.length,
        pages: pageCount,
        hasNextPage: pageCount > pageNumber,
        hasPrevPage: pageCount >= pageNumber && pageNumber > 1,
      },
      docs: items,
      query: {
        where: whereDoc,
        orderBy: orderBy,
        skip: offset,
        take: pageLimit,
      },
    };

    const result = convertBigIntToString(pagination);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
