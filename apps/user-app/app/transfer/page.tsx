"use client";
import { useEffect, useState } from "react";
import CheckSession from "../component/CheckSession";
import { useForm } from "react-hook-form";
import { AddMoney, getBalances, getTrx } from "../action";
import BalanceCard from "../component/balanceCard/balanceCard";


export default function Transfer(){
    const [formData,setFormData]=useState({
        amount:0,
        Bank:""
    });
    const [transactions,setTransaction]=useState<Array<any>>([]);
    const [balance,setBalance]=useState<any>(null);

   async function fetchData(){
    const res=await getTrx();
    const bal= await getBalances();
    console.log(bal);
    setBalance(bal);    
    setTransaction(res);
    return res;
   } 

    

    useEffect(()=>{
      fetchData();
    },[]);


    const totalbanks:string[]=["HDFC","AXIS","ICICI"]
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
          if(formData.Bank=="" || formData.amount==0){
            throw "Empty data";
          }
      const res= await AddMoney(formData.Bank,formData.amount);
        window.location.reload();
      }catch(err){
        console.log(err);
      }

      };



    return(
        <>
        <CheckSession>
        <div className="w-full flex flex-col justify-between md:flex-row p-4 items-start">
  
  {/* Left: Form */}
  <form onSubmit={onSubmit} className="w-full h-72 md:h-96 flex flex-col space-y-6 md:space-y-8 bg-white p-4 max-w-xl items-center rounded-md mt-10 md:mt-0 md:mr-4 shadow-lg border border-gray-600">
    <h1 className="text-2xl font-bold mb-6 text-black">Add Money</h1>
    <input type="number" placeholder="Amount" name="amount" onChange={handleChange} className="border p-2 md:mt-4 w-full rounded text-black"  />
    <select value={formData.Bank} name="Bank" onChange={handleChange} className="border p-2 md:mt-4 w-full rounded text-black">
      <option value="" disabled className="text-black">Select Bank</option>
      {totalbanks.map((bank: string, index: number) => (
        <option value={bank} key={index}>{bank}</option>
      ))}
    </select>
    <button type="submit" className="w-full bg-blue-500 text-white px-4 md:mt-8 mt-2 py-2 rounded hover:bg-blue-600">
      Submit
    </button>
  </form>

  {/* Right: Balance */}
  <BalanceCard balance={balance || undefined} />

</div>





        <div className="w-full flex flex-col md:flex-row-reverse pr-4 pl-4">
                
        <div className="w-full shadow-lg h-80 flex flex-col space-y-6 h-72 bg-white p-4 max-w-md items-center rounded-md my-10 overflow-y-auto border border-gray-600"> 
        <h1 className="text-2xl font-bold mb-6 text-black">Transanction</h1>

                        
        {transactions.length > 0 ? (
  transactions.map((tx) => (
    <div
      key={tx.id}
      className="w-full flex justify-between items-center text-black"
    >
      <div className="flex flex-col">
        <span className="font-semibold">{tx.status}</span>
        <span className="text-sm text-gray-600">
          {tx.startTime.toLocaleString('en-GB', {
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
    No Recent Transactions
  </div>
)}

                


        </div>
            
        </div>
        </CheckSession>
        </>
    )
}



























































