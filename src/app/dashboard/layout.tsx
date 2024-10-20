import { getServerSession } from "next-auth";
import DashboardHeader from "./components/header";
import LayoutProperties from "./properties/layout";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({ children }: LayoutProperties) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
