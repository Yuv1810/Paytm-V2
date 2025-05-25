"use client";
import { useEffect, useState } from "react";
import { getP2P, P2Ptransfer } from "../api/lib/actions/p2p_action";
import { useSession } from "next-auth/react";

export default function P2P(){

    const session:any= useSession();
    const userId=session?.user?.id;

     const [formData,setFormData]=useState({
            number:"",
            amount:0,
        });
        const [transactions,setTransaction]=useState<Array<any>>([]);

        const [error, setError] = useState("");

        async function fetchData() {
            const res= await getP2P();
            setTransaction(res);
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
          <div className="w-full flex flex-col justify-between md:flex-row p-4 items-start">
          <form onSubmit={onSubmit} className="w-full h-72 md:h-96 flex flex-col space-y-6 md:space-y-8 bg-white p-4 max-w-xl items-center rounded-md mt-10 md:mt-0 md:mr-4 shadow-lg border border-gray-600">
    <h1 className="text-2xl font-bold mb-6 text-black">Add Money</h1>
    {error && (
          <div className="mb-4 text-red-600 font-semibold text-xs text-center">{error}</div>
        )}
    
    <input type="number" placeholder="Amount" name="amount" onChange={handleChange} className="border p-2 md:mt-4 w-full rounded text-black"  />
   
    <input type="text" value={formData.number}  placeholder="Phone No" name="number" onChange={handleChange} className="border p-2 md:mt-4 w-full rounded text-black"/>

    <button type="submit" className="w-full bg-blue-500 text-white px-4 md:mt-8 mt-2 py-2 rounded hover:bg-blue-600">
      Submit
    </button>
  </form>

  <div className="w-full flex flex-col md:flex-row-reverse pr-4 pl-4">
                
        <div className="w-full shadow-lg h-80 flex flex-col space-y-6 h-72 bg-white p-4 max-w-md items-center rounded-md my-10 overflow-y-auto border border-gray-600"> 
        <h1 className="text-2xl font-bold mb-6 text-black">Peer to Peer Transactions</h1>

        {transactions.length > 0 ? (
  transactions.map((tx) => (
    <div
      key={tx.id}
      className="w-full flex justify-between items-center text-black"
    >
      <div className="flex flex-col">
        <span className="font-semibold">
          From: {tx.fromUser?.name || tx.fromUserId} → To: {tx.toUser?.name || tx.toUserId}
        </span>
        <span className="text-sm text-gray-600">
          {new Date(tx.timestamp).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </span>
      </div>
      <div className="text-right font-bold">₹{tx.amount}</div>
    </div>
  ))
) : (
  <div className="w-full text-center text-gray-500 py-4">
    No Recent P2P Transactions
  </div>
)}

          </div>
          </div>
          </div>
       
        </>
    )
}