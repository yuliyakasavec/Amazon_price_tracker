import { prisma } from '@/lib/db';
import { scrapeProduct } from '@/lib/productScraper';
import { endOfDay, isToday, startOfDay, subDays } from 'date-fns';

export async function GET() {
  const products = await prisma.product.findMany();
  for (const product of products) {
    const latestHistoryDbData = await prisma.productDataHistory.findFirst({
      where: {
        amazonId: product.amazonId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (latestHistoryDbData && isToday(latestHistoryDbData.createdAt)) {
      continue;
    }
    const newProductData = await scrapeProduct(product.amazonId);
    await prisma.productDataHistory.create({
      data: newProductData,
    });

    const prevDayData = await prisma.productDataHistory.findFirst({
      where: {
        amazonId: product.amazonId,
        createdAt: {
          gt: startOfDay(subDays(new Date(), 1)),
          lt: endOfDay(subDays(new Date(), 1)),
        },
      },
    });
    if (prevDayData && prevDayData.price > newProductData.price) {
      await prisma.notification.create({
        data: {
          userEmail: product.userEmail,
          amazonId: product.amazonId,
          title: `The price of ${product.title} has decreased from ${
            prevDayData.price / 100
          }pl to ${newProductData.price / 100}pl`,
        },
      });
    }
  }
  return Response.json('ok');
}
