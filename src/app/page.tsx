import Image from "next/image";

import heroImg from "@/assets/hero.svg";

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-heightscreen">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua Empresa</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">Atendimentos em Clientes</h1>
      <Image
        src={heroImg}
        alt="Imagem de desenvolvimento do controle"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
