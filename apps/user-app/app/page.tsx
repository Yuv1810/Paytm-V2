import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import Navbar from "./component/navbar/page";

import { authOptions, getSessionServer } from "./api/lib/auth";
import { link } from "fs";



type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default async function Home() {
  const session = await getSessionServer(); // Get session before rendering anything
  
  
  return (
   <>
   <Navbar session={session} />
    
    <div className="min-h-screen font-sans text-gray-800">

      {/* Hero */}
      <section className="bg-blue-50 flex flex-col md:flex-row items-center justify-between p-6 p-20 md:p-16">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Recharge Wallet & Pay to Peer in Seconds</h2>
          <p className="text-gray-600 mb-6">Fast and secure.</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="p-6 md:p-12 bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {[
          { label: "Transfer", img: "/left-right-arrows_10118069.png" , link:"/transfer"},
          { label: "Transaction", img: "/transaction_17611630.png" ,link:"/transaction"},
          { label: "Architecture", img: "/house_17822724.png" ,link:"/architecture"},
          { label: "P2P", img: "/relations_6209922.png" ,link:"/p2p"},
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center space-y-2">
            <a href={item.link}>
            <Image src={item.img} alt={item.label} width={60} height={60} />
            <span className="text-sm font-medium">{item.label}</span>
            </a>
            
          </div>
        ))}
      </section>

      {/* Download App */}
      <section className="p-6 md:p-16 bg-gray-100 flex flex-col md:flex-row justify-between items-center">
        <div className="max-w-xl mb-6 md:mb-0">
          <div className="flex space-x-4">
            <div>
            <Image src="/left-right-arrows_10118069.png" alt="Transaction" width={80} height={80} />
           
            </div>
            <div className="text-lg font-lg mt-4">Making Secure</div>
          </div>
         
        </div>
        <div className="w-full max-w-md p-4 text-center">
  <h2 className="text-xl font-semibold mb-2">Secure Payments</h2>
  <p className="text-gray-700">
    Your transactions are protected with end-to-end encryption and industry-standard security protocols. We never store sensitive payment information, ensuring your data stays safe and private at all times.
  </p>
</div>

      </section>
    </div>

   </>
  );
}


