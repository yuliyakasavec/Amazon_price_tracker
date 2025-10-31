import Header from '@/components/Header';
import { auth } from './auth';
import LoginView from './LoginView';
import Sidebar from '@/components/Sidebar';

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      {user && (
        <div className="p-4 h-screen">
          <Header user={user} />
          <div className="mt-4 grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <Sidebar />
            </div>
            <div className="col-span-9 bg-white rounded-2xl">content</div>
          </div>
        </div>
      )}
      {!user && <LoginView />}
    </div>
  );
}
