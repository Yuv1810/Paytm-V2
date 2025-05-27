"use client";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";
import Loader from "../component/loader/loader";
import SignInPage from "../component/singInPage";

export default function Page() {
    
  return (
    <Suspense fallback={<Loader/>}>
        <SignInPage />
    </Suspense>
    
  );
}
