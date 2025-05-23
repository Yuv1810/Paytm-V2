"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Loader from "./loader/loader";

type Props = {
    children: ReactNode;
  };

export default function CheckSession({children}:Props){
    const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  
  if (status === "loading" || status=="unauthenticated") {
    return (
      <Loader/>
    ); // or a loading spinner
  }




return(
    <>
   {children}
    </>
)

}