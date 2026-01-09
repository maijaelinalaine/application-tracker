import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex flex-row gap-3 h-12 items-center justify-between w-full p-2 bg-indigo-300">
      <Link href="/" className="text-xs font-medium">
        Application Tracker
      </Link>
      <div className="flex flex-row items-center justify-end w-full gap-3">
        <Link href="/about" className="text-xs font-medium">
          About
        </Link>
        <Link href="/form" className="text-xs font-medium">
          New application
        </Link>
      </div>
    </header>
  );
}
