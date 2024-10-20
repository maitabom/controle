"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn("google");
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link
          className="font-bold text-2xl uppercase pl-1 hover:tracking-widest duration-300"
          href="/"
        >
          <h1>
            <span className="text-blue-500">Sistema</span> de Controle
          </h1>
        </Link>
        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin} title="Logar com Google">
            <FiLock size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <nav className="flex items-baseline gap-4">
            <Link href="/dashboard">
              <FiUser size={26} color="#4b5563" />
            </Link>
            <button onClick={handleLogout}>
              <FiLogOut size={26} color="#ef4444" />
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
