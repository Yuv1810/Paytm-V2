import Image, { type ImageProps } from "next/image";

export default function Footer(){
return(
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
)
}