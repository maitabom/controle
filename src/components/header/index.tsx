import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
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
        <nav className="flex items-baseline gap-4">
          <Link href="/dashboard">
            <FiUser size={26} color="#4b5563" />
          </Link>
          <Link href="/">
            <FiLogOut size={26} color="#4b5563" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
