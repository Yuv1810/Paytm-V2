import { ReactNode } from "react";
import Navbar from "../component/navbar/page";
import { Session } from "inspector/promises";
import { getSessionServer } from "../api/lib/auth";

export default async function RootLayout({children}:{children:ReactNode}){
     const session = await getSessionServer();
    return(
        <>
        <Navbar session={session}/>
        <div className="pt-16">
        {children}
        </div>
        </>
    )
}