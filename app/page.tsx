import { auth } from './auth';
import LoginView from './LoginView';
import LogoutView from './LogoutView';

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      {user && (
        <div className="ml-2 mt-2">
          hello {user.name}
          <LogoutView />
        </div>
      )}
      {!user && <LoginView />}
    </div>
  );
}
