"use client";

import Link from "next/link";
import withAuth from "@/hocs/WithAuth";

function FirstLevel() {

  return (
    <div>
      <h1>Rota segura de nível 1</h1>
      <Link href="/home">Home | </Link>
      <Link href="/home/level-2">Level 2</Link>
    </div>
  );
}

export default withAuth(FirstLevel, 1);