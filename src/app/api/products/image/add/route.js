import { prisma } from "@/app/api/_components/Prisma";
import { convertBigIntToString } from "@/app/api/_components/utils/convertBigint";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { product_id, image_url } = body;

    if (!product_id || !image_url) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 500 }
      );
    }

    const product = await prisma.products.findUnique({
      where: { id: parseInt(product_id) },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );
    }

    const productImage = await prisma.product_images.create({
      data: {
        product_id: parseInt(product_id),
        image_url,
      },
    });

    const result = convertBigIntToString(productImage);

    return NextResponse.json({ result: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
