"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";

type ProfileMenuProps = {
  name?: string | null;
  image?: string | null;
  initial: string;
};

export default function ProfileMenu({ name, image, initial }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) {
        return;
      }
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 text-white focus:outline-none"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {image ? (
          <img
            src={image}
            alt={name || "User avatar"}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-sm font-semibold">
            {initial}
          </div>
        )}
        <span className="text-sm font-semibold">{name || "Signed in"}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-lg"
        >
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
            role="menuitem"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
