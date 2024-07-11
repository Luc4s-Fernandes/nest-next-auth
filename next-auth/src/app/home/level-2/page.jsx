"use client";

import Link from "next/link";
import withAuth from "@/hocs/WithAuth";

function SecondLevel() {

  return (
    <div>
      <h1>Rota segura de nível 2</h1>
      <Link href="/home/level-1">Level 1 | </Link>
      <Link href="/home/level-3">Level 3 | </Link>
      <Link href="/home">Home</Link>
    </div>
  );
}

export default withAuth(SecondLevel, 2);