"use client";
import { getSessionServer } from "../api/lib/auth";
import CheckSession from "../component/CheckSession";
import Navbar from "../component/navbar/page";


export default function mainscreen(){

    return(
      <> 
      <CheckSession>
        <div className="w-full p-10 h-screen bg-blue-500">
        Billo they bagiya ki karengei
        </div>
        </CheckSession>
      
        </>
    )
}