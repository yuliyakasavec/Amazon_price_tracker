'use client';

import Image from 'next/image';
import { Card } from './ui/card';
import LineChart from './LineChart';
import { Product, ProductDataHistory } from '@/generated/prisma/client';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

export default function DashboardProductCard({
  product,
  history,
}: {
  product: Product;
  history: ProductDataHistory[];
}) {
  return (
    <Card className="py-4 px-4 overflow-hidden">
      <div className="flex gap-4">
        <div className="w-22 h-22 flex justify-center items-center">
          <Image src={product.img} alt="" width={96} height={96} />
        </div>
        <div className="grow">
          <h3 className="font-bold">Amazon Echo Dot</h3>
          <div className="flex">
            <div className="">
              <h4 className="my-2">{product.price / 100}zł</h4>
              <h5 className="text-xs text-gray-600">
                <ReactTimeAgo date={product.updatedAt} locale="en-US" />
              </h5>
            </div>
            <div className="grow pt-4">
              <LineChart
                data={history.map((hp) => ({
                  x: hp.createdAt.toLocaleDateString(),
                  price: hp.price / 100,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
