import { prisma } from '@/lib/db';
import { auth } from '../auth';

export default async function Notifications() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.email) {
    return null;
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userEmail: user.email,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="col-span-9">
      <h1 className="font-bold my-2">Notifications</h1>
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div className="flex gap-2" key={notification.id}>
            <div className="text-gray-600">
              {notification.createdAt.toLocaleDateString('sv-PL')}
            </div>
            <div>{notification.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
