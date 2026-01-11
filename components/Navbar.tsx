import Link from "next/link";
import { Home, ClipboardList, Calendar } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between w-full h-13 px-4 py-2 bg-slate-700 font-sans">
      <Link
        href="/"
        className="flex items-center gap-2 text-xs font-medium whitespace-nowrap text-white"
      >
        <ClipboardList className="w-5 h-5" />
        Application Tracker
      </Link>
      <div className="flex items-center gap-3">
        <Link href="/about" className="text-xs font-medium text-white">
          About
        </Link>
        <Link href="/form" className="text-xs font-medium text-white">
          New application
        </Link>
      </div>
    </header>
  );
}
