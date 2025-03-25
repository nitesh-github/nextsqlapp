import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
      <p className="text-gray-600 mt-2">This is your main content area.</p>
    </>
  );
}
