import { Button } from '@/components/ui/button';
import { signOut } from './auth';

export default function LogoutView() {
  return (
    <div className="flex items-start m-2">
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type="submit" variant="outline">
          Logout
        </Button>
      </form>
    </div>
  );
}
