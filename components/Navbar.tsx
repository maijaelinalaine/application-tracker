import Link from "next/link";
import { Home, ClipboardList, Calendar } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between w-full h-16 px-6 py-3 bg-slate-700 font-sans">
      <Link
        href="/"
        className="flex items-center gap-3 text-base font-medium whitespace-nowrap text-white"
      >
        <ClipboardList className="w-6 h-6" />
        Application Tracker
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/about" className="text-base font-medium text-white">
          About
        </Link>
        <Link href="/form" className="text-base font-medium text-white">
          New application
        </Link>
      </div>
    </header>
  );
}
