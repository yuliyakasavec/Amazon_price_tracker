import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { signIn } from './auth';

export default function LoginView() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="min-w-xs text-center">
        <div>
          <h1 className="text-2xl font-bold m-0">Welcome back</h1>
          <p>please login to continue</p>
        </div>
        <div>
          <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
          >
            <Button type="submit">Login with Google</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
