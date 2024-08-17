import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { formatOrder } from "../../_components/utils/list";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");
    const order = "desc";

    const orderBy = formatOrder(order);

    if (!product_id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const items = await prisma.product_images.findMany({
      where: { product_id: parseInt(product_id) },
      orderBy: orderBy,
    });

    const result = convertBigIntToString(items);

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
