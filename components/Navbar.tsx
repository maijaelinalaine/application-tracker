import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex flex-row gap-5 h-20 items-center justify-between w-full p-4 bg-indigo-300">
      <Link href="/" className="text-2xl">
        Application Tracker
      </Link>
      <div className="flex flex-row items-center justify-end w-full">
        <Link href="/about" className="text-2xl">
          About
        </Link>
      </div>
    </header>
  );
}
