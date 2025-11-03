import LineChart from './LineChart';
import { Card } from './ui/card';

export default function DashboardTopCard({ title = 'Price', value = '29.99' }) {
  return (
    <Card className="pt-4 pb-0">
      <div className="flex justify-between p-0 relative">
        <div className="absolute top-1 left-4">
          {title}
          <br />
          <span className="font-bold">{value}</span>
        </div>
        <div className="grow mx-0 overflow-hidden rounded-b-xl">
          <div className="-mx-3">
            <LineChart />
          </div>
        </div>
      </div>
    </Card>
  );
}
