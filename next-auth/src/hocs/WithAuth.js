"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

const withAuth = (WrappedComponent, permissionLevel) => {
  return (props) => {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
      if (!isAuthenticated() || (user && user.access_level < permissionLevel)) {
        alert("Você não tem permissão para acessar essa página");
        router.push("/");
      }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated() || (user && user.access_level < permissionLevel)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
