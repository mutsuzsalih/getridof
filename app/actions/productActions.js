"use server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(imageUrl, prev, formData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  if (!name || !description || !price) {
    return { message: "All fields are required!" };
  }
  if (!imageUrl) {
    return { message: "Please upload an image!" };
  }

  try {
    const session = await auth();
    if (!session) {
      return { message: "User not authenticated!" };
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image : imageUrl,
        sellerId: session.user.id,
      },
    });
    revalidatePath("/myproducts")
    return { message: "Product created!", productId: product.id };
  } catch (error) {
    console.error("Error creating product:", error);
    return { message: "Something went wrong!" };
  }
}

export async function editProduct(id, prev, formData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");

  if (!name || !description || !price) {
    return { message: "All fields are required!" };
  }

  try {
    const session = await auth();
    if (!session) {
      return { message: "User not authenticated!" };
    }

    const foundProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!foundProduct) {
      return { message: "Product not found!" };
    }

    if (foundProduct.sellerId !== session.user.id) {
      return { message: "You are not the seller of this product!" };
    }

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price: parseFloat(price),
      },
    });
    revalidatePath("/myproducts")
    return { message: "Product updated!", productId: product.id };
  } catch (error) {
    console.error("Error updating product:", error);
    return { message: "Something went wrong!" };
  }
}

export async function deleteProduct(id) {
  try {
    const session = await auth();
    if (!session) {
      return { message: "User not authenticated!" };
    }

    const foundProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!foundProduct) {
      return { message: "Product not found!" };
    }

    if (foundProduct.sellerId !== session.user.id) {
      return { message: "You are not the seller of this product!" };
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });
    
  } catch (error) {
    console.error("Error deleting product:", error);
    return { message: "Something went wrong!" };
  }
  redirect("/myproducts")
}
