







"use client";
import { useEffect, useState } from "react";
import { getP2P_Received, getP2P_Sent, P2Ptransfer } from "../api/lib/actions/p2p_action";
import { useSession } from "next-auth/react";
import CheckSession from "../component/CheckSession";

export default function P2P(){

    const session:any= useSession();
    const userId=session?.user?.id;

     const [formData,setFormData]=useState({
            number:"",
            amount:0,
        });
        const [senttransactions,setSentTransaction]=useState<Array<any>>([]);
        const [receivedtransactions,setReceivedTransaction]=useState<Array<any>>([]);

        const [error, setError] = useState("");

        async function fetchData() {
            const sentMoney= await getP2P_Sent();
            setSentTransaction(sentMoney);

            const receivedMoney= await getP2P_Received();
            setReceivedTransaction(receivedMoney);


        }

        useEffect(()=>{

            fetchData();

        },[]);


     const onSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            
            try{
              if(formData.number=="" || formData.amount==0){
                throw "Empty data";
              }
              const numberRegex = /^\d{10}$/;
              if (!numberRegex.test(formData.number)) {
                setError("Phone number must be exactly 10 digits.");
                return;
              }

              const res= await P2Ptransfer(formData.number,formData.amount);
              console.log(res);
        //    Hit serever action  to send money           
        //   const res= await AddMoney(formData.number,formData.amount);
            window.location.reload();
          }catch(err){
            console.log(err);
          }
    
          };


          const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            })
        }
    


    return(
        <>
       <CheckSession>
  <div className="w-full flex flex-col md:flex-row justify-center items-start gap-6 p-4">
  {/* <div className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-lg border h-96 overflow-y-auto flex flex-col space-y-6"> */}
    {/* Add Money Form */}
    <form
      onSubmit={onSubmit}
       className="w-full md:w-1/2 min-h-96 flex flex-col space-y-6 bg-white p-6 rounded-2xl shadow-md"
    >
      <h1 className="text-2xl font-bold text-[#002970]">Send Money</h1>

      {error && (
        <div className="text-red-600 font-medium text-sm text-center">{error}</div>
      )}

      <input
        type="number"
        placeholder="Amount"
        name="amount"
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded text-black w-full"
      />

      <input
        type="text"
        value={formData.number}
        placeholder="Phone No"
        name="number"
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded text-black w-full"
      />

      <button
        type="submit"
        className="bg-[#00baf2] text-white py-3 rounded-md hover:bg-[#018ac3] transition mt-6"
      >
        Submit
      </button>
    </form>

    {/* P2P Transactions */}
    <div className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-md h-96 overflow-y-auto flex flex-col space-y-6">
      <h1 className="text-2xl font-bold text-[#002970]">Peer to Peer Transactions</h1>

      {senttransactions.length === 0 && receivedtransactions.length === 0 ? (
  <div className="w-full text-center text-gray-500 text-sm">
    No Recent Transactions
  </div>
) : (
  <>
    {/* Sent Transactions */}
    {senttransactions.length > 0 && (
      <>
        <h2 className="text-lg font-semibold text-[#002970] mt-6 mb-2">
          Sent Transactions
        </h2>
        {senttransactions.map((tx) => (
          <div
            key={tx.id}
            className="w-full flex justify-between items-start text-black bg-[#f8f9fb] rounded-md px-4 py-3"
          >
            <div className="flex flex-col text-sm">
              <span className="font-semibold">
                From: You → To:{" "}
                {tx.toUser?.number || tx.toUserId}
              </span>
              <span className="text-xs text-gray-600">
                {new Date(tx.timestamp).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
            <div className="text-right font-bold text-red-700 text-sm">
              ₹{tx.amount}
            </div>
          </div>
        ))}
      </>
    )}

    {/* Received Transactions */}
    {receivedtransactions.length > 0 && (
      <>
        <h2 className="text-lg font-semibold text-[#002970] mt-6 mb-2">
          Received Transactions
        </h2>
        {receivedtransactions.map((tx) => (
          <div
            key={tx.id}
            className="w-full flex justify-between items-start text-black bg-[#f8f9fb] rounded-md px-4 py-3"
          >
            <div className="flex flex-col text-sm">
              <span className="font-semibold">
                From: {tx.fromUser?.number || tx.fromUserId} → To:{" "}
                You
              </span>
              <span className="text-xs text-gray-600">
                {new Date(tx.timestamp).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
            <div className="text-right font-bold text-green-700 text-sm">
              ₹{tx.amount}
            </div>
          </div>
        ))}
      </>
    )}
  </>
)}




    </div>
  </div>
</CheckSession>

        </>
    )
}