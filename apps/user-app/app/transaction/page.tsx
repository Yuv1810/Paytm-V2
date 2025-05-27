"use client";
import { useEffect, useState } from "react";
import { getTrx } from "../api/lib/actions/action";
import { getP2P_ReceivedAll, getP2P_SentAll } from "../api/lib/actions/p2p_action";
import CheckSession from "../component/CheckSession";

export default function Transfer() {
  const [transactions, setTransaction] = useState<Array<any>>([]);
  const [senttransactions,setSentTransaction]=useState<Array<any>>([]);
  const [receivedtransactions,setReceivedTransaction]=useState<Array<any>>([]);

   async function fetchData(){
      const res=await getTrx();
        const sentMoney= await getP2P_SentAll();
                  setSentTransaction(sentMoney);
      
                  const receivedMoney= await getP2P_ReceivedAll();
                  setReceivedTransaction(receivedMoney);
      
      
      setTransaction(res);
      return res;
     } 

         useEffect(()=>{
           fetchData();
         },[]);

  return (
    <>
     <CheckSession>
    <div className="m-4 flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-6 max-w-screen">
      {/* Transactions Box */}
      <div className="lg:w-1/2 w-full h-96 flex flex-col space-y-6 bg-white p-4 items-center rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold text-[#002970]">Added Money</h1>

        <div className="w-full max-h-80 overflow-y-auto space-y-4 px-1">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center bg-[#f8f9fb] rounded-lg px-4 py-3 shadow-sm"
              >
                {/* Left Side */}
                <div className="flex flex-col">
                  <span
                    className={`font-medium text-sm ${
                      tx.status === "SUCCESS"
                        ? "text-green-600"
                        : tx.status === "FAILED"
                        ? "text-red-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {tx.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {tx.startTime.toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>

                {/* Right Side */}
                <div className="text-right font-semibold text-[#002970]">
                  ₹{tx.amount.toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center text-gray-500 text-sm">No Recent Transactions</div>
          )}
        </div>
      </div>

      {/* Transfer Box */}
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
  );
}
