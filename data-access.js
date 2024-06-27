import { auth } from "@/auth";
import { prisma } from "@/client";

export async function getMyProcuts(page) {
  const pageSize = 8;
  const session = await auth();
  if (!session) {
    return { message: "User not authenticated!" };
  }

  const products = await prisma.product.findMany({
    where: {
      sellerId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return products;
}

export async function getTotalMyProductsPage() {
  const pageSize = 8;
  const session = await auth();
  if (!session) {
    return { message: "User not authenticated!" };
  }

  const totalProducts = await prisma.product.count({
    where: {
      sellerId: session.user.id,
    },
  });

  return Math.ceil(totalProducts / pageSize);
}

export async function getProductById(id) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
}

export async function getAllProducts(page, query) {
  const pageSize = 8;

  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      seller: true,
    },

    orderBy: {
      createdAt: "desc",
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return products;
}

export async function getTotalProductsPage(query) {
  const pageSize = 8;
  const totalProducts = await prisma.product.count({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return Math.ceil(totalProducts / pageSize);
}
