// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect } from "react";
// import Loader from "./loader/loader";

// type Props = {
//   children: ReactNode;
// };

// export default function CheckSession({ children }: Props) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.replace("/"); // use replace to avoid going back to protected page
//     }
//   }, [status, router]);


//   if (status === "loading") {
//     return <Loader />;
//   }

//   if (status === "unauthenticated") {
//     return null; // already redirecting
//   }

//   return <>{children}</>;
// }











"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Loader from "./loader/loader";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export default function CheckSession({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! You're not signed in.</h1>
          <p className="text-gray-600 mb-6">Please go to the homepage to sign in and continue.</p>
          <Link href="/">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
