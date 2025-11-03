import Image from 'next/image';
import { Card } from './ui/card';
import LineChart from './LineChart';

export default function DashboardProductCard() {
  return (
    <Card className="py-4 px-4 overflow-hidden">
      <div className="flex gap-4">
        <div className="w-24">
          <Image
            src="https://i.insider.com/634071872095d500187d0ec3?width=800&format=jpeg&auto=webp"
            alt=""
            width={96}
            height={96}
          />
        </div>
        <div className="relative grow -mb-4 flex items-end">
          <div className="absolute w-full top-0">
            <h3 className="font-bold">Amazon Echo Dot</h3>
            <h4>$49.99</h4>
            <h5 className="text-xs text-gray-600">4 hours ago</h5>
          </div>
          <div className="grow -ml-2 -mr-7">
            <LineChart />
          </div>
        </div>
      </div>
    </Card>
  );
}
