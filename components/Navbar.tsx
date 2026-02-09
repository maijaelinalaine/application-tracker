import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProfileMenu from "@/components/ProfileMenu";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userInitial = user?.name?.charAt(0) || user?.email?.charAt(0) || "U";

  return (
    <header className="flex items-center justify-between w-full h-20 px-6 py-3 bg-slate-700 font-sans">
      <Link
        href="/"
        className="flex items-center gap-3 text-xl font-medium whitespace-nowrap text-white"
      >
        <ClipboardList className="w-8 h-8" />
        Application Tracker
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/about"
          className="text-base font-medium text-white px-3 py-1.5 rounded-md transition-colors hover:bg-slate-600/70"
        >
          About
        </Link>
        <Link
          href="/form"
          className="text-base font-medium text-white px-3 py-1.5 rounded-md transition-colors hover:bg-slate-600/70"
        >
          New application
        </Link>
        {user ? (
          <ProfileMenu
            name={user.name}
            image={user.image}
            initial={userInitial}
          />
        ) : (
          <Link
            href="/auth"
            className="text-base font-medium text-white px-3 py-1.5 rounded-md transition-colors hover:bg-slate-600/70"
          >
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
