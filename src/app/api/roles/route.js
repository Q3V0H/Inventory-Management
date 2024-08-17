import { NextResponse } from "next/server";
import { formatOrder } from "../_components/utils/list";
import { prisma } from "../_components/Prisma";
import { convertBigIntToString } from "../_components/utils/convertBigint";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;
    const order = searchParams.get("order") || "desc";

    const whereDoc = {};
    const orderBy = formatOrder(order);

    const total = await prisma.roles.count({ where: whereDoc });
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const pageCount = Math.ceil(total / pageLimit);

    const offset = pageNumber > 1 ? pageNumber * pageLimit - pageLimit : 0;

    const items = await prisma.roles.findMany({
      where: whereDoc,
      orderBy: orderBy,
      skip: offset,
      take: pageLimit,
      include: {
        members: true,
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

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
