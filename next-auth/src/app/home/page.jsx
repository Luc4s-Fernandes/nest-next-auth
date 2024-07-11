"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import withAuth from "@/hocs/WithAuth";

function Home() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/home/level-1">Level 1 | </Link>
      <Link href="/home/level-2">Level 2 | </Link>
      <Link href="/home/level-3">Level 3</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default withAuth(Home);
