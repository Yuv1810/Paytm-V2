'use client'


{/* <button
onClick={() => signOut({ callbackUrl: '/api/auth/signin' })}
className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
>
Sign out
</button> */}

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { Home, List, Menu, Send, X ,Repeat} from "lucide-react"
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { Share } from "next/font/google";




export default function Navbar({ session }: { session: any }) {

  const router = useRouter();
    // const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn,setIsLoggedIn] = useState(true);



  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     setIsLoggedIn(false);
  //   }
  // }, [status]);
  


  return (
    <nav className="bg-white shadow-md fixed w-screen ">
      <div className="max-w-7xl mx-auto px-4 py-3 h-16 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
    MyApp
</div>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600 space-x-1">
        <Home size={18} />
        <span>Home</span>
      </Link>

      <Link href="/transfer" className="flex items-center text-gray-700 hover:text-blue-600 space-x-1">
        <Send size={18} />
        <span>Transfer</span>
      </Link>

      <Link href="/transaction" className="flex items-center text-gray-700 hover:text-blue-600 space-x-1">
        <List size={18} />
        <span>Transaction</span>
      </Link>
      <Link href="/p2p" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
      <Repeat size={18} />
      <span>P2P</span>
     </Link>

          {session ? (
           <button className="w-full bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600" onClick={() => signOut()}>Sign out</button>
          ) : (
            // <Link href="/signin">
            <>
            <button className="w-40 h-12 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => signIn()}>Sign in </button>
             <button className="w-40 h-12 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={()=> router.push('/signup')}>Sign up</button>
             </>
              

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
          <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2">
        <Home size={18} />
        <span>Home</span>
      </Link>

      <Link href="/transfer" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2">
        <Send size={18} />
        <span>Transfer</span>
      </Link>

      <Link href="/transaction" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2">
        <List size={18} />
        <span>Transaction</span>
      </Link>

      <Link href="/p2p" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2">
        <Repeat size={18} />
        <span>Peer 2 Peer</span>
      </Link>

          {session ? (          
              <button className="w-full bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600" onClick={() => signOut()}>Sign out</button>
          ) : (
            // <Link href="/signin">
            <>
              <button className="w-full bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={() => signIn()}>Sign in</button>
              <button className="w-full bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={()=> router.push('/signup')}>Sign up</button>
              </>
              
            // </Link>
          )}
        </div>
      )}
    </nav>
  );
}
