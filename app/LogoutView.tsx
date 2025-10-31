import { Button } from '@/components/ui/button';
import { signOut } from './auth';

export default function LogoutView() {
  return (
    <div className="flex items-center justify-center">
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type="submit" className="py-0">
          Logout
        </Button>
      </form>
    </div>
  );
}
