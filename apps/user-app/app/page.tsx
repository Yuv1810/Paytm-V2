import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import Navbar from "./component/navbar/page";

import { authOptions, getSessionServer } from "./api/lib/auth";



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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Recharge & Pay Bills in Seconds</h2>
          <p className="text-gray-600 mb-6">Fast, secure, and trusted by millions. Mobile, DTH, electricity & more.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
            Get Started
          </button>
        </div>
        <div className="mt-8 md:mt-0">
          <Image src="/hero-phone.png" alt="Paytm App" width={400} height={400} />
        </div>
      </section>

      {/* Quick Links */}
      <section className="p-6 md:p-12 bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {[
          { label: "Recharge", img: "/recharge.png" },
          { label: "Electricity", img: "/electricity.png" },
          { label: "DTH", img: "/dth.png" },
          { label: "Credit Card", img: "/creditcard.png" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center space-y-2">
            <Image src={item.img} alt={item.label} width={60} height={60} />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </section>

      {/* Download App */}
      <section className="p-6 md:p-12 bg-gray-100 flex flex-col md:flex-row justify-between items-center">
        <div className="max-w-xl mb-6 md:mb-0">
          <h3 className="text-2xl font-semibold mb-2">Download the Paytm App</h3>
          <p className="text-gray-600 mb-4">Get the best experience and access all services on the go.</p>
          <div className="flex space-x-4">
            <Image src="/google-play.png" alt="Google Play" width={150} height={45} />
            <Image src="/app-store.png" alt="App Store" width={150} height={45} />
          </div>
        </div>
        <Image src="/download-app.png" alt="App Promo" width={300} height={300} />
      </section>
    </div>

   </>
  );
}


