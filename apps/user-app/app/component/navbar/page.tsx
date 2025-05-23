'use client'


{/* <button
onClick={() => signOut({ callbackUrl: '/api/auth/signin' })}
className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
>
Sign out
</button> */}

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link";



export default function Navbar({ session }: { session: any }) {

    // const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn,setIsLoggedIn] = useState(true);



  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     setIsLoggedIn(false);
  //   }
  // }, [status]);
  


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 h-16 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600 ml-4 px-2 py-1 rounded w-24 h-full flex justify-center items-center">
    MyApp
</div>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Home</span>
          </Link>
          <Link href="/transfer">
            <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Transfer</span>
          </Link>
          <Link href="/transaction">
            <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Transaction</span>
          </Link>

          {session ? (
           <button className="w-full bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600" onClick={() => signOut()}>Sign out</button>
          ) : (
            // <Link href="/signin">
              <button className="w-full bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={() => signIn()}>Sign in</button>

            // </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-t border-gray-200">
          <Link href="/">
            <span className="block text-gray-700 hover:text-blue-600 cursor-pointer">Home</span>
          </Link>
          <Link href="/transfer">
            <span className="block text-gray-700 hover:text-blue-600 cursor-pointer">Transfer</span>
          </Link>
          <Link href="/transaction">
            <span className="block text-gray-700 hover:text-blue-600 cursor-pointer">Transaction</span>
          </Link>

          {session ? (          
              <button className="w-full bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600" onClick={() => signOut()}>Sign out</button>
          ) : (
            // <Link href="/signin">
              <button className="w-full bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={() => signIn()}>Sign in</button>
              
            // </Link>
          )}
        </div>
      )}
    </nav>
  );
}
