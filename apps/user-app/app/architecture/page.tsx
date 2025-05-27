import Head from "next/head";
import { Caveat } from "next/font/google";
import Image from 'next/image';

const caveat = Caveat({ subsets: ["latin"], weight: "400" });

export default function Blog() {
  return (
    <>
      <Head>
        <title>Paytm Clone Architecture</title>
      </Head>
      <div className={`${caveat.className} max-w-5xl mx-auto px-4 py-10`}>
        <h1 className="text-5xl mb-6 text-[#002970] font-bold">
          🚀 Building a Paytm Clone: Architecture, Security & Scalability Insights
        </h1>

        <p className="text-2xl text-[#002970] leading-8">
          In my latest project, I set out to recreate the core functionality of Paytm —
          allowing users to add money, send money, and manage their wallet — but with a
          backend architecture and deployment pipeline modeled for real-world scale,
          security, and resilience.
        </p>

      

        <p className="text-2xl text-[#002970] mt-4 leading-8">
          The frontend is powered by <strong>Next.js</strong>, designed as a user-facing
          application. I used <strong>NextAuth</strong> for authentication, which securely
          manages user sessions without relying on localStorage — everything is handled
          server-side through HTTP-only cookies, reducing session hijacking risks.
        </p>

        <p className="text-2xl text-[#002970] mt-4 leading-8">
          To simulate a banking system securely, I implemented a <strong>webhook</strong>{" "}
          that acts as a trusted channel between the bank and the app. The bank hits this
          endpoint with a secure token whenever money is added to the user’s wallet. It’s
          isolated from the main API to prevent unauthorized access and to
          avoid abuse.
        </p>

        <div className="relative w-full max-w-3xl h-64 md:h-96 my-8 mx-auto shadow-lg rounded-lg">
        <Image
          src="/Architecture.png" // put your image file in public folder
          alt="Payment Security Illustration"
          fill
          style={{ objectFit: 'contain' }}
          priority // optional: loads image eagerly
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

        <p className="text-2xl text-[#002970] mt-4 leading-8">
          To handle concurrency, I used <strong>row-level locking</strong> to block
          multiple threads from modifying the same balance simultaneously. This ensures
          transactional safety, preventing double-spending or race conditions during
          wallet-to-wallet transfers.
        </p>

        <p className="text-2xl text-[#002970] mt-4 leading-8">
          The app was containerized with <strong>Docker</strong> and deployed using a{" "}
          <strong>CI/CD pipeline</strong> set up through Docker Hub. Each change pushed to
          GitHub triggers a build and deployment to a <strong>Google Cloud e2 instance</strong> via
          Compute Engine. This automated flow minimizes downtime and human error, making
          deployment fast and reliable.
        </p>

        <p className="text-2xl text-[#002970] mt-4 leading-8">
          What started as a simple Paytm clone evolved into a deeply educational journey
          into system design, DevOps, authentication security, and distributed computing.
          It's a solid foundation for building real-world fintech systems that need to be
          secure, scalable, and user-friendly.
        </p>

        <p className="mt-10 text-lg text-gray-800">
          Built with ❤️ using Next.js and styled to match Excalidraw's sketchy aesthetic.
        </p>
      </div>
    </>
  );
}
