import { ChartNoAxesCombinedIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import LogoutView from '@/app/LogoutView';
import { User } from 'next-auth';
import { Input } from './ui/input';

export default async function Header({ user }: { user: User }) {
  return (
    <header className="flex justify-between items-center">
      <Link href="" className="flex gap-1 items-center">
        <ChartNoAxesCombinedIcon />
        AmazonPriceTracker
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex bg-gray-50 rounded-full items-center relative">
          <SearchIcon className="absolute left-2 pointer-events-none text-gray-600" />
          <Input
            className="rounded-full shadow-none border-0 bg-gray-50 pl-10"
            placeholder="Search..."
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <LogoutView />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
