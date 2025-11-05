import {
  AlignJustifyIcon,
  BellIcon,
  HeadsetIcon,
  LaptopIcon,
  PackagePlusIcon,
  PlugIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside
      style={{ minHeight: `calc(100vh - 80px)` }}
      className="bg-white rounded-2xl p-4 h-full"
    >
      <h2 className="uppercase text-gray-600 text-xs font-extrabold mb-2">
        Navigation
      </h2>
      <nav className="flex flex-col gap-2 *:flex *:gap-1 *:items-center">
        <Link href={'/'}>
          <AlignJustifyIcon className="h-5" />
          All products
        </Link>
        <Link href={'/add-product'}>
          <PackagePlusIcon className="h-5" />
          Add product
        </Link>
        <Link href={'/notifications'}>
          <BellIcon className="h-5" />
          Notifications
        </Link>
      </nav>
      <h2 className="uppercase text-gray-600 text-xs font-extrabold mt-6 mb-2">
        Categories
      </h2>
      <nav className="flex flex-col gap-2 *:flex *:gap-1 *:items-center">
        <Link href={'/electronics'}>
          <PlugIcon className="h-5" />
          Electronics
        </Link>
        <Link href={'/headsets'}>
          <HeadsetIcon className="h-5" />
          Headsets
        </Link>
        <Link href={'/laptops'}>
          <LaptopIcon className="h-5" />
          Laptops
        </Link>
      </nav>
    </aside>
  );
}
