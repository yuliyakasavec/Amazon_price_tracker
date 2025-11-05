'use server';

import { auth } from '@/app/auth';
import { prisma } from '@/lib/db';
import { scrapeProduct } from '@/lib/productScraper';

export async function addProduct(productId: string) {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.email) {
    return false;
  }
  const productRow = await prisma.product.create({
    data: { ...(await scrapeProduct(productId)), userEmail: user.email },
  });
  return productRow.id;
}
