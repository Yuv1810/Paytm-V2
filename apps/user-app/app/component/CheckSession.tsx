"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Loader from "./loader/loader";

type Props = {
  children: ReactNode;
};

export default function CheckSession({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); // use replace to avoid going back to protected page
    }
  }, [status, router]);


  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    return null; // already redirecting
  }

  return <>{children}</>;
}
