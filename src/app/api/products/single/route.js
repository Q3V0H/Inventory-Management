import { NextResponse } from "next/server";
import { prisma } from "../../_components/Prisma";
import { convertBigIntToString } from "../../_components/utils/convertBigint";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) },
      include: {
        product_images: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );
    }

    const result = convertBigIntToString(product);

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
