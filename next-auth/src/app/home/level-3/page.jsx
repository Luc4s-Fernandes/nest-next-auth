"use client";

import Link from "next/link";
import withAuth from "@/hocs/WithAuth";

function ThirdLevel() {

  return (
    <div>
      <h1>Rota segura de nível 3</h1>
      <Link href="/home/level-2">Level 2</Link>
      <Link href="/home">Home</Link>
    </div>
  );
}

export default withAuth(ThirdLevel, 3);