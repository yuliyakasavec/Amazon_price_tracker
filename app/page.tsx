import Header from '@/components/Header';
import { auth } from './auth';
import LoginView from './LoginView';

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      {user && (
        <div className="p-4">
          <Header user={user} />
        </div>
      )}
      {!user && <LoginView />}
    </div>
  );
}
